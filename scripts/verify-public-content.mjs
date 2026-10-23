import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { stripTypeScriptTypes } from 'node:module'

// Run in a fresh Node 24 process: all upstream requests and editor writes use fixtures.
const root = fileURLToPath(new URL('../', import.meta.url))
async function load(path, replacements = []) {
  let source = await fs.readFile(root + path, 'utf8')
  source = source.replace("import 'server-only'", '')
    .replace(/import \{ articleFallbackImages[^\n]+/, "const articleFallbackImages = ['fallback.png']")
    .replace(/import type[^\n]+/g, '')
  for (const [from, to] of replacements) source = source.replace(from, to)
  const outputText = stripTypeScriptTypes(source, { mode: 'transform' })
  return import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'))
}

process.env.BEEHIIV_API_KEY = 'test-only'
process.env.BEEHIIV_PUBLICATION_ID = 'test-publication'
let requests = []
globalThis.fetch = async (input, init) => {
  requests.push({ url: String(input), init })
  const page = new URL(input).searchParams.get('page')
  return Response.json({ data: [{ id: page, title: 'Edition ' + page, web_url: 'https://newsletter.altusnews.com/p/test', publish_date: 1 }], total_pages: 2 })
}
const beehiiv = await load('src/lib/beehiiv.ts')
const editions = await beehiiv.getPublishedBeehiivPosts()
assert.equal(editions.length, 2, 'all Beehiiv pages are retained')
assert.equal(requests.length, 2)
assert.equal(requests[0].init.signal, requests[1].init.signal, 'pagination shares one timeout budget')
for (const { init } of requests) {
  assert.equal(init.next.revalidate, 300)
  assert.notEqual(init.cache, 'no-store')
}
globalThis.fetch = async () => new Response('', { status: 503 })
assert.deepEqual(await beehiiv.getPublishedBeehiivPosts(), [], 'upstream errors retain graceful fallback')

requests = []
globalThis.fetch = async (url, init) => {
  requests.push({ url, init })
  return new Response('<feed><entry><yt:videoId>abc</yt:videoId><title>Altus &amp; AI</title><published>2026-10-01T00:00:00Z</published></entry></feed>')
}
const youtube = await load('src/lib/youtube.ts')
assert.equal((await youtube.getLatestYouTubeVideos())[0].title, 'Altus & AI')
assert.equal(requests[0].init.next.revalidate, 300)
assert.ok(requests[0].init.signal instanceof AbortSignal)

process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-only.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'test-only'
requests = []
globalThis.fetch = async (input, init) => {
  requests.push({ url: new URL(input), init })
  const post = { id: 'site1', slug: 'test', title: 'Test', subtitle: '', excerpt: 'Summary', body: 'Paragraph one\n\nParagraph two', category: 'AI', author: 'Altus', cover_image_url: null, video_url: 'https://youtube.com/watch?v=abc', published_at: '2026-10-01', created_at: '2026-10-01' }
  return Response.json([post])
}
const posts = await load('src/lib/site-posts.ts', [["'@supabase/supabase-js'", JSON.stringify(pathToFileURL(root + 'node_modules/@supabase/supabase-js/dist/index.mjs').href)]])
assert.equal((await posts.getPublishedSitePosts())[0].body.length, 2)
assert.equal((await posts.getPublishedSiteVideos())[0].youtubeUrl, 'https://youtube.com/watch?v=abc')
assert.equal((await posts.getPublishedSitePost('test')).slug, 'test')
for (const { url, init } of requests) {
  assert.equal(url.searchParams.get('status'), 'eq.published', 'drafts are excluded from cached reads')
  assert.equal(init.next.revalidate, 300)
  assert.ok(init.signal instanceof AbortSignal)
}
assert.deepEqual(requests.map(r => r.init.next.tags[0]), ['site-articles', 'site-videos', 'site-article:test'])

const invalidations = []
const cacheStub = 'data:text/javascript,' + encodeURIComponent('export const revalidateTag = (...args) => globalThis.testInvalidations.push(args); export const revalidatePath = (path) => globalThis.testInvalidations.push([path]);')
const supabaseStub = 'data:text/javascript,' + encodeURIComponent('export const createClient = () => ({auth:{getUser:async()=>({data:{user:{id:"editor"}}})},from:()=>({insert:async()=>({error:null})})});')
globalThis.testInvalidations = invalidations
const route = await load('src/app/api/admin/posts/route.ts', [
  ["'next/server'", JSON.stringify(pathToFileURL(root + 'node_modules/next/server.js').href)],
  ["'next/cache'", JSON.stringify(cacheStub)],
  ["'@supabase/supabase-js'", JSON.stringify(supabaseStub)],
])
const payload = { title: 'Test', slug: 'test', excerpt: 'Summary', body: 'Text', category: 'AI', author: 'Altus', status: 'published' }
const request = (data, authorized = true) => new Request('http://localhost/api/admin/posts', { method: 'POST', headers: { 'content-type': 'application/json', ...(authorized ? { authorization: 'Bearer test-only' } : {}) }, body: JSON.stringify(data) })
assert.equal((await route.POST(request(payload, false))).status, 401)
assert.equal(invalidations.length, 0, 'unauthorized requests cannot invalidate content')
assert.equal((await route.POST(request({ ...payload, status: 'draft' }))).status, 200)
assert.equal(invalidations.length, 0, 'draft saves do not invalidate public content')
assert.equal((await route.POST(request(payload))).status, 200)
assert.deepEqual(invalidations.slice(0, 2), [['site-articles', { expire: 0 }], ['site-article:test', { expire: 0 }]])
assert.ok(invalidations.some(([path]) => path === '/'))
console.log('PASS: pagination, feed parsing, public-only cached queries, bounded requests, authorization, and publish/draft cache invalidation')

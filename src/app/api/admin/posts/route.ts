import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

const required = ['title', 'slug', 'excerpt', 'body', 'category', 'author'] as const
const limits = { title: 180, slug: 180, subtitle: 240, excerpt: 500, body: 100_000, category: 80, author: 120, cover_image_url: 2_048, video_url: 2_048 } as const

function safeHttpsUrl(value: string | undefined) {
  if (!value) return true
  try { return new URL(value).protocol === 'https:' } catch { return false }
}

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const token = request.headers.get('authorization')
  if (!url || !key) return NextResponse.json({ error: 'Publishing is not configured.' }, { status: 503 })
  if (!token?.match(/^Bearer\s+\S+$/i)) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 150_000) return NextResponse.json({ error: 'This post is too large.' }, { status: 413 })
  const values = await request.json().catch(() => null) as Record<string, string> | null
  if (!values || typeof values !== 'object') return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  if (required.some((field) => !values[field]?.trim())) return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
  if (Object.entries(limits).some(([field, limit]) => typeof values[field] === 'string' && values[field].trim().length > limit)) return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 })
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.slug)) return NextResponse.json({ error: 'Use lowercase letters, numbers, and hyphens for the URL slug.' }, { status: 400 })
  if (!safeHttpsUrl(values.cover_image_url) || !safeHttpsUrl(values.video_url)) return NextResponse.json({ error: 'Image and video links must use HTTPS.' }, { status: 400 })
  const supabase = createClient(url, key, { global: { headers: { Authorization: token } }, auth: { persistSession: false } })
  const { data: { user } } = await supabase.auth.getUser(token.replace(/^Bearer\s+/i, ''))
  if (!user) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  const status = values.status === 'published' ? 'published' : 'draft'
  const contentType = values.content_type === 'video' ? 'video' : 'article'
  if (contentType === 'video' && !values.video_url?.trim()) return NextResponse.json({ error: 'Add a video link.' }, { status: 400 })
  const { error } = await supabase.from('posts').insert({ title: values.title.trim(), slug: values.slug.trim(), subtitle: values.subtitle?.trim() || null, excerpt: values.excerpt.trim(), body: values.body.trim(), category: values.category.trim(), author: values.author.trim(), cover_image_url: values.cover_image_url?.trim() || null, content_type: contentType, video_url: contentType === 'video' ? values.video_url.trim() : null, status, published_at: status === 'published' ? new Date().toISOString() : null, author_id: user.id })
  if (error) {
    if (error.code === '23505') return NextResponse.json({ error: 'That URL slug is already in use.' }, { status: 409 })
    return NextResponse.json({ error: error.message.includes('row-level security') ? 'This signed-in account is not approved as an Altus editor.' : 'The post could not be saved.' }, { status: 403 })
  }
  if (status === 'published') { revalidatePath('/news'); revalidatePath('/videos'); revalidatePath(`/news/${values.slug}`); revalidatePath('/') }
  return NextResponse.json({ message: status === 'published' ? `Published to Altus ${contentType === 'video' ? 'Videos' : 'News'}.` : 'Draft saved.' })
}

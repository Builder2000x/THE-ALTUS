import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { articleFallbackImages, type Article, type Video } from '@/lib/content'

export type SitePost = {
  id: string
  slug: string
  title: string
  subtitle: string | null
  excerpt: string
  body: string
  category: string
  author: string
  cover_image_url: string | null
  content_type: 'article' | 'video'
  video_url: string | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
}

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function getPublishedSitePosts(): Promise<Article[]> {
  const supabase = client()
  if (!supabase) return []
  const { data } = await supabase.from('posts').select('*').eq('status', 'published').eq('content_type', 'article').order('published_at', { ascending: false })
  return ((data ?? []) as SitePost[]).map((post, index) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle ?? '',
    excerpt: post.excerpt,
    author: post.author,
    publishedAt: post.published_at ?? post.created_at,
    category: post.category,
    tags: [post.category],
    image: post.cover_image_url ?? articleFallbackImages[index % articleFallbackImages.length],
    body: post.body.split(/\n{2,}/).filter(Boolean),
  }))
}

export async function getPublishedSitePost(slug: string): Promise<Article | undefined> {
  const supabase = client()
  if (!supabase) return undefined
  const { data } = await supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').eq('content_type', 'article').maybeSingle()
  if (!data) return undefined
  const post = data as SitePost
  return { id: post.id, slug: post.slug, title: post.title, subtitle: post.subtitle ?? '', excerpt: post.excerpt, author: post.author, publishedAt: post.published_at ?? post.created_at, category: post.category, tags: [post.category], image: post.cover_image_url ?? articleFallbackImages[0], body: post.body.split(/\n{2,}/).filter(Boolean) }
}

export async function getPublishedSiteVideos(): Promise<Video[]> {
  const supabase = client()
  if (!supabase) return []
  const { data } = await supabase.from('posts').select('*').eq('status', 'published').eq('content_type', 'video').order('published_at', { ascending: false })
  return ((data ?? []) as SitePost[]).map((post, index) => ({ id: post.id, title: post.title, description: post.excerpt, publishedAt: post.published_at ?? post.created_at, youtubeUrl: post.video_url ?? '', thumbnail: post.cover_image_url ?? articleFallbackImages[index % articleFallbackImages.length], category: post.category }))
}

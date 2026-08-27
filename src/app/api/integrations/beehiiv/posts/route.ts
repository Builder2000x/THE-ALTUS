import { NextResponse } from 'next/server'
import { getPublishedBeehiivPosts } from '@/lib/beehiiv'

export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = await getPublishedBeehiivPosts()
  return NextResponse.json({ posts: posts.map(({ id, title, excerpt, publishedAt, category, image, href }) => ({ id, title, excerpt, publishedAt, category, image, href })) })
}

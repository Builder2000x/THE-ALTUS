import { articleFallbackImages, type Article } from './content'

type BeehiivPost = {
  id: string
  title?: string
  subtitle?: string
  preview_text?: string
  slug?: string
  web_url?: string
  thumbnail_url?: string
  created?: number
  publish_date?: number
  authors?: string[]
  content_tags?: string[]
}

export async function getPublishedBeehiivPosts(): Promise<Article[]> {
  const apiKey = process.env.BEEHIIV_API_KEY?.trim()
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID?.trim()
  if (!apiKey || !publicationId) return []

  try {
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/posts?status=confirmed&platform=all&limit=24&order_by=publish_date&direction=desc`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: 'no-store',
    })
    if (!response.ok) return []
    const payload = await response.json() as { data?: BeehiivPost[] }
    return (payload.data ?? []).filter((post) => post.title && post.web_url).map((post, index) => ({
      id: post.id,
      slug: post.slug || post.id,
      title: post.title || 'Untitled brief',
      subtitle: post.subtitle || '',
      excerpt: post.preview_text || post.subtitle || 'Read the latest Altus brief.',
      author: post.authors?.[0] || 'Altus Editorial',
      publishedAt: new Date((post.publish_date ?? post.created ?? Date.now() / 1000) * 1000).toISOString(),
      category: post.content_tags?.[0] || 'Brief',
      tags: post.content_tags ?? [],
      image: post.thumbnail_url || articleFallbackImages[index % articleFallbackImages.length],
      body: [],
      href: post.web_url,
    }))
  } catch {
    return []
  }
}

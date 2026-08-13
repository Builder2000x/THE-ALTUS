import 'server-only'
import type { Video } from '@/lib/content'

export const ALTUS_YOUTUBE_CHANNEL = 'UCsr7W63vA711gx8cQnJ05ig'
export const ALTUS_YOUTUBE_URL = `https://www.youtube.com/channel/${ALTUS_YOUTUBE_CHANNEL}`

const decode = (value: string) => value
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .trim()

const tag = (xml: string, name: string) => {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'))
  return match ? decode(match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1')) : ''
}

export async function getLatestYouTubeVideos(): Promise<Video[]> {
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${ALTUS_YOUTUBE_CHANNEL}`, { cache: 'no-store' })
    if (!response.ok) return []
    const feed = await response.text()
    const entries = feed.match(/<entry>[\s\S]*?<\/entry>/gi) ?? []

    return entries.slice(0, 12).flatMap((entry) => {
      const id = tag(entry, 'yt:videoId')
      const title = tag(entry, 'title')
      const publishedAt = tag(entry, 'published')
      const description = tag(entry, 'media:description') || 'Watch the latest Altus video on YouTube.'
      if (!id || !title || !publishedAt) return []
      return [{
        id: `youtube-${id}`,
        title,
        description,
        publishedAt,
        youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        category: 'YouTube',
      }]
    })
  } catch {
    return []
  }
}

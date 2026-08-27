import type { MetadataRoute } from 'next'
import { getPublishedSitePosts } from '@/lib/site-posts'

const base = 'https://altusnews.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: .9 },
    { url: `${base}/videos`, lastModified: new Date(), changeFrequency: 'weekly', priority: .7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: .5 },
    { url: `${base}/store`, lastModified: new Date(), changeFrequency: 'monthly', priority: .5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: .4 },
    { url: `${base}/subscribe`, lastModified: new Date(), changeFrequency: 'monthly', priority: .7 },
  ]
  const articles = await getPublishedSitePosts()
  return [...staticRoutes, ...articles.map((article) => ({ url: `${base}/news/${article.slug}`, lastModified: article.publishedAt, changeFrequency: 'monthly' as const, priority: .8 }))]
}

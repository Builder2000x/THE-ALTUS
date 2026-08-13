import type { Metadata } from 'next'
import { getPublishedBeehiivPosts } from '@/lib/beehiiv'
import { getPublishedSitePosts } from '@/lib/site-posts'
import { ArticleCard } from '@/components/ContentCards'
import { SidebarAd } from '@/components/AdSlot'

export const metadata: Metadata = { title: 'News archive', description: 'Reporting and ideas from Altus.' }

export default async function NewsPage() {
  const [beehiivPosts, sitePosts] = await Promise.all([getPublishedBeehiivPosts(), getPublishedSitePosts()])
  const livePosts = [...sitePosts, ...beehiivPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  const feed = livePosts

  return <main className="page shell">
    <header className="page-head">
      <p className="eyebrow">The archive</p>
      <h1>All the stories<br/><em>worth keeping.</em></h1>
      <p>A growing library of reporting, analysis, conversations and useful perspectives.</p>
    </header>
    <div className="archive-layout">
      {feed.length ? <div className="archive-grid">{feed.map((article) => <ArticleCard article={article} key={article.id}/>)}</div> : <section className="archive-empty"><p className="eyebrow">The first edition is next</p><h2>The archive is<br/><em>waiting for the signal.</em></h2><p>Website articles and confirmed Beehiiv editions will appear here automatically.</p></section>}
      <SidebarAd/>
    </div>
  </main>
}

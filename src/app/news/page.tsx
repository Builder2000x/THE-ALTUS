import type { Metadata } from 'next'
import { getPublishedBeehiivPosts } from '@/lib/beehiiv'
import { getPublishedSitePosts } from '@/lib/site-posts'
import { ArticleCard } from '@/components/ContentCards'
import NewsHero from './NewsHero'
import NewsReveal from './NewsReveal'
import motionStyles from './NewsArchiveMotion.module.css'

export const metadata: Metadata = { title: 'News archive', description: 'Reporting and ideas from Altus.', alternates: { canonical: '/news' } }

export default async function NewsPage() {
  const [beehiivPosts, sitePosts] = await Promise.all([getPublishedBeehiivPosts(), getPublishedSitePosts()])
  const livePosts = [...sitePosts, ...beehiivPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  const feed = livePosts

  return <main className="news-page">
    <NewsHero />
    <section className={`page shell ${motionStyles.archive}`} id="latest-news">
      <NewsReveal className={motionStyles.archiveIntro}>
        <header className="page-head">
          <p className="eyebrow">The archive</p>
          <h1>All the stories<br/><em>worth keeping.</em></h1>
          <p>A growing library of reporting, analysis, conversations and useful perspectives.</p>
        </header>
      </NewsReveal>
      <div className="archive-layout">
        {feed.length ? <div className="archive-grid">{feed.map((article, index) => <NewsReveal className={motionStyles.cardReveal} delay={(index % 4) * 70} key={article.id}><ArticleCard article={article}/></NewsReveal>)}</div> : <NewsReveal><section className="archive-empty"><p className="eyebrow">The first edition is next</p><h2>The archive is<br/><em>waiting for the signal.</em></h2><p>Website articles and confirmed Beehiiv editions will appear here automatically.</p></section></NewsReveal>}
      </div>
    </section>
  </main>
}

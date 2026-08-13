import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getPublishedBeehiivPosts } from '@/lib/beehiiv'
import { getPublishedSitePosts, getPublishedSiteVideos } from '@/lib/site-posts'
import { ALTUS_YOUTUBE_URL, getLatestYouTubeVideos } from '@/lib/youtube'
import { AdBanner } from '@/components/AdSlot'
import { ArticleCard, VideoCard } from '@/components/ContentCards'
import Reveal from '@/components/Reveal'
import KineticHero from '@/components/KineticHero'
import NewsletterForm from '@/components/NewsletterForm'
import MascotMoment from '@/components/MascotMoment'
import SignalTicker from '@/components/SignalTicker'

export default async function Home() {
  const [sitePosts, beehiivPosts, siteVideos, youtubeVideos] = await Promise.all([getPublishedSitePosts(), getPublishedBeehiivPosts(), getPublishedSiteVideos(), getLatestYouTubeVideos()])
  const feed = [...sitePosts, ...beehiivPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  const featured = feed[0]
  const latest = feed.slice(1, 3)
  const videoFeed = [...siteVideos, ...youtubeVideos].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return <main>
    <SignalTicker items={feed.map((article) => article.title)} />
    <KineticHero />
    {featured && <section className="shell featured-story"><Reveal className="section-label-row"><p className="eyebrow">The lead story</p><Link href="/news">All reporting <ArrowUpRight size={16} /></Link></Reveal><Reveal delay={.1}><ArticleCard article={featured} featured /></Reveal></section>}
    <AdBanner />
    <section className="shell content-section"><Reveal className="section-title"><p className="eyebrow">Latest thinking</p><h2>Worth your<br /><em>attention.</em></h2></Reveal>{latest.length ? <div className="article-grid">{latest.map((article, i) => <Reveal key={article.id} delay={i * .1}><ArticleCard article={article} /></Reveal>)}</div> : <Reveal className="editorial-empty"><p>The next story is in progress. Subscribe for the daily brief and return soon.</p></Reveal>}<Link className="text-link" href="/news">Browse the archive <ArrowUpRight size={17} /></Link></section>
    <section className="home-subscribe"><div className="shell split-subscribe"><Reveal><p className="eyebrow">The daily brief</p><h2>Five minutes.<br /><em>More clarity.</em></h2></Reveal><Reveal delay={.12}><p>Get the Altus brief in your inbox. Every email signup goes directly to the Altus News Beehiiv list.</p><NewsletterForm /></Reveal><MascotMoment pose="guide" className="newsletter-mascot" /></div></section>
    <section className="shell content-section"><Reveal className="section-label-row"><div><p className="eyebrow">Watch Altus</p><h2>The conversation<br /><em>continues.</em></h2></div><Link href="/videos">All videos <ArrowUpRight size={16} /></Link></Reveal>{videoFeed.length ? <div className="video-grid">{videoFeed.slice(0, 3).map((video) => <Reveal key={video.id}><VideoCard video={video} /></Reveal>)}</div> : <Reveal className="editorial-empty"><p>The first Altus video will appear here automatically after it is published on YouTube.</p><a className="text-link" href={ALTUS_YOUTUBE_URL} target="_blank" rel="noreferrer">Visit the Altus YouTube channel <ArrowUpRight size={17} /></a></Reveal>}</section>
  </main>
}

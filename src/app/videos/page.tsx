import type { Metadata } from 'next'
import { getPublishedSiteVideos } from '@/lib/site-posts'
import { ALTUS_YOUTUBE_URL, getLatestYouTubeVideos } from '@/lib/youtube'
import { VideoCard } from '@/components/ContentCards'
import NewsletterForm from '@/components/NewsletterForm'
import VideoHero from './VideoHero'
import VideoReveal from './VideoReveal'
import styles from './VideoPage.module.css'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Altus visual reporting and conversations on the forces shaping the world.',
  alternates: { canonical: '/videos' },
}

export default async function VideosPage() {
  const [siteVideos, youtubeVideos] = await Promise.all([
    getPublishedSiteVideos(),
    getLatestYouTubeVideos(),
  ])
  const feed = [...siteVideos, ...youtubeVideos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  const [featured, ...moreVideos] = feed

  return (
    <main className={styles.page}>
      <VideoHero />

      <section className={styles.library} id="latest-videos" aria-labelledby="video-library-title">
        <div className="shell">
          <VideoReveal className={styles.libraryIntro}>
            <h2 id="video-library-title">Watch the latest.</h2>
            <p>Films, interviews and explainers made with clarity and care.</p>
          </VideoReveal>

          {featured ? (
            <div className={styles.videoCollection}>
              <VideoReveal className={styles.featuredVideo}>
                <VideoCard video={featured} />
              </VideoReveal>
              {moreVideos.length > 0 ? (
                <div className={styles.videoGrid}>
                  {moreVideos.map((video, index) => (
                    <VideoReveal className={styles.videoItem} delay={(index % 3) * 70} key={video.id}>
                      <VideoCard video={video} />
                    </VideoReveal>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <VideoReveal className={styles.emptyState}>
              <p>Coming to Altus Films</p>
              <h3>Our first story is taking shape.</h3>
              <span>New Altus uploads will appear here automatically.</span>
              <a href={ALTUS_YOUTUBE_URL} target="_blank" rel="noreferrer">
                Visit the Altus YouTube channel
              </a>
            </VideoReveal>
          )}
        </div>
      </section>

      <section className={styles.signup} aria-labelledby="video-signup-title">
        <div className={`shell ${styles.signupInner}`}>
          <VideoReveal className={styles.signupCopy}>
            <h2 id="video-signup-title">Stay close to the story.</h2>
            <p>New reporting and every Altus film, delivered directly.</p>
          </VideoReveal>
          <VideoReveal className={styles.signupForm} delay={100}>
            <NewsletterForm compact />
          </VideoReveal>
        </div>
      </section>
    </main>
  )
}

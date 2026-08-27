import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './Store.module.css'

export const metadata: Metadata = {
  title: 'Store',
  description: 'The Altus Store is coming soon.',
  alternates: { canonical: '/store' },
}

export default function StorePage() {
  return (
    <main className={styles.storePage}>
      <section className={styles.storeHero} aria-labelledby="store-title">
        <div className={styles.catalogLines} aria-hidden="true">
          <span /><span /><span /><span />
        </div>

        <div className={`shell ${styles.storeInner}`}>
          <div className={styles.storeCopy}>
            <p className={styles.eyebrow}>The Altus Store · Edition 00</p>
            <h1 id="store-title">Coming<br /><em>soon.</em></h1>
            <p className={styles.storeDeck}>
              A considered collection of objects for curious minds. We are selecting the first edition now.
            </p>
            <Link className={styles.storeLink} href="/subscribe">
              Hear when it opens <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.displayCase} aria-hidden="true">
            <div className={styles.caseIndex}><span>Collection</span><span>00 / 00</span></div>
            <div className={styles.objectStage}>
              <span className={styles.objectOne} />
              <span className={styles.objectTwo} />
              <span className={styles.objectThree} />
            </div>
            <p>Objects worth keeping</p>
          </div>

          <div className={styles.storeFoot} aria-hidden="true">
            <span>Designed for the thoughtful everyday</span>
            <span>Opening later</span>
          </div>
        </div>
      </section>
    </main>
  )
}

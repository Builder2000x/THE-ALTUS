import type { Metadata } from 'next'
import Link from 'next/link'
import AboutReveal from './AboutReveal'
import styles from './About.module.css'

export const metadata: Metadata = {
  title: 'About',
  description: 'Altus is an independent global media company making sense of the forces shaping our world.',
  alternates: { canonical: '/about' },
}

const principles = [
  {
    number: '01',
    title: 'Clarity over noise',
    copy: 'We make complicated subjects legible without making them smaller.',
  },
  {
    number: '02',
    title: 'Curiosity without borders',
    copy: 'We follow consequential ideas wherever they begin and wherever they lead.',
  },
  {
    number: '03',
    title: 'Independence, always',
    copy: 'Our judgment belongs to our readers. That principle guides every story we publish.',
  },
]

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroLines} aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <div className={`shell ${styles.heroInner}`}>
          <p className={styles.eyebrow}>About Altus</p>
          <h1 id="about-title">
            Independent<br />
            <em>by design.</em>
          </h1>
          <div className={styles.heroFoot}>
            <p>Global by outlook.</p>
            <span>Editorial company · Est. 2025</span>
          </div>
        </div>
      </section>

      <section className={styles.statement} aria-labelledby="about-statement-title">
        <div className="shell">
          <AboutReveal className={styles.statementGrid}>
            <p className={styles.sectionLabel}>What we are here to do</p>
            <h2 id="about-statement-title">
              Help thoughtful people understand what is changing, <em>and why it matters.</em>
            </h2>
            <div className={styles.statementCopy}>
              <p>
                Altus is an independent digital media company reporting on power, technology,
                culture and the global economy.
              </p>
              <p>
                We bring context to the headlines, ask better questions and make work that
                respects the reader&apos;s intelligence and time.
              </p>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className={styles.worldview} aria-labelledby="worldview-title">
        <div className={`shell ${styles.worldviewGrid}`}>
          <AboutReveal className={styles.lens}>
            <div className={styles.lensRings} aria-hidden="true">
              <span /><span /><span />
              <i>ALTUS</i>
            </div>
            <p>One world.<br />Many points of view.</p>
          </AboutReveal>

          <AboutReveal className={styles.worldviewCopy} delay={90}>
            <p className={styles.sectionLabel}>Our worldview</p>
            <h2 id="worldview-title">The most important stories rarely fit inside one category.</h2>
            <p>
              Markets shape politics. Technology reshapes culture. Ideas travel faster than
              institutions. Altus connects those movements so readers can see the whole picture.
            </p>
          </AboutReveal>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className="shell">
          <AboutReveal className={styles.principlesHead}>
            <p className={styles.sectionLabel}>How we work</p>
            <h2 id="principles-title">A few principles.<br /><em>Held closely.</em></h2>
          </AboutReveal>

          <div className={styles.principleList}>
            {principles.map((principle, index) => (
              <AboutReveal className={styles.principle} delay={index * 70} key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.promise} aria-labelledby="promise-title">
        <div className="shell">
          <AboutReveal className={styles.promiseInner}>
            <p className={styles.sectionLabel}>The promise</p>
            <h2 id="promise-title">No manufactured urgency.<br />No borrowed convictions.</h2>
            <p>Just rigorous work, considered carefully and made for a global audience.</p>
          </AboutReveal>
        </div>
      </section>

      <section className={styles.invitation} aria-labelledby="invitation-title">
        <div className={`shell ${styles.invitationInner}`}>
          <AboutReveal>
            <p className={styles.sectionLabel}>Read with us</p>
            <h2 id="invitation-title">Stay curious.</h2>
          </AboutReveal>
          <AboutReveal className={styles.invitationAction} delay={90}>
            <p>Join readers who want more context, better questions and fewer distractions.</p>
            <Link href="/subscribe">Get the brief <span aria-hidden="true">↗</span></Link>
          </AboutReveal>
        </div>
      </section>
    </main>
  )
}

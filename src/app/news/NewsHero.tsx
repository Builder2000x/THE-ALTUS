'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './NewsHero.module.css'

export default function NewsHero() {
  const [entered, setEntered] = useState(false)
  const [motionPaused, setMotionPaused] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      className={styles.hero}
      aria-labelledby="news-page-title"
      data-entered={entered ? '' : undefined}
      data-motion-paused={motionPaused ? '' : undefined}
    >
      <div className={styles.art} aria-hidden="true">
        <Image
          src="/news-black-hole-concept-3.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className={styles.cartography} aria-hidden="true">
        <span className={styles.north}>60°N</span>
        <span className={styles.east}>120°E</span>
        <span className={styles.equator}>0°</span>
        <span className={styles.south}>30°S</span>
      </div>

      <div className={styles.lightSweep} aria-hidden="true" />

      <div className={styles.motionField} aria-hidden="true">
        <span className={styles.orbitOuter} />
        <span className={styles.orbitMiddle} />
        <span className={styles.orbitInner} />
        <span className={styles.orbitPulse} />
      </div>

      <div className={styles.copy}>
        <p className={styles.eyebrow}>Altus / World in view</p>
        <h1 id="news-page-title" className={styles.title}>
          <span className={styles.titleLine}><span>Beyond</span></span>
          <span className={styles.titleLine}><em>the event.</em></span>
        </h1>
        <p className={styles.deck}>
          Reporting the shifts in power, technology and the global economy.
        </p>
        <p className={styles.signal}>News that moves the world.</p>
        <button
          className={styles.motionControl}
          type="button"
          aria-pressed={motionPaused}
          onClick={() => setMotionPaused((paused) => !paused)}
        >
          <span aria-hidden="true" />
          {motionPaused ? 'Play motion' : 'Pause motion'}
        </button>
      </div>
    </section>
  )
}

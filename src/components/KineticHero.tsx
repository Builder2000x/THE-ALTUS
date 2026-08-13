'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Compass, Globe2, ShieldCheck } from 'lucide-react'
import { useRef } from 'react'
import banner from '../../GOAT BANNER.png'
import logo from '../../transparent logo.png'
import NewsletterForm from './NewsletterForm'

const values = [
  { icon: Compass, title: 'Curious', copy: 'We ask better questions.' },
  { icon: Globe2, title: 'Insightful', copy: 'We bring clarity to complexity.' },
  { icon: ShieldCheck, title: 'Trusted', copy: 'We earn trust every day.' },
]

export default function KineticHero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -34])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.045])
  const panelY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 28])

  return (
    <section className="expedition-hero" ref={ref}>
      <motion.div
        className="expedition-media"
        initial={reduceMotion ? false : { clipPath: 'inset(0 0 0 100%)' }}
        animate={{ clipPath: 'inset(0 0 0 0%)' }}
        transition={{ duration: reduceMotion ? 0 : 1.05, delay: reduceMotion ? 0 : 0.08, ease: [0.77, 0, 0.175, 1] }}
        style={{ y: mediaY, scale: mediaScale }}
      >
        <Image src={banner} alt="Altus mountain goat explorer overlooking a summit" priority fill sizes="100vw" />
      </motion.div>
      <div className="expedition-atmosphere" aria-hidden="true" />
      <motion.div className="expedition-panel" style={{ y: panelY }}>
        <div className="expedition-topography" aria-hidden="true" />
        <div className="shell expedition-content">
          <motion.div
            className="expedition-brand"
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={logo} alt="Altus News" />
            <span>The daily brief</span>
          </motion.div>
          <h1 aria-label="Ideas with altitude.">
            <span className="expedition-word-mask"><motion.span initial={false} animate={{ y: 0, filter: 'blur(0px)' }} transition={{ duration: reduceMotion ? 0 : 0.78, delay: reduceMotion ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}>Ideas with</motion.span></span>
            <span className="expedition-word-mask"><motion.span className="accent-word" initial={false} animate={{ y: 0, filter: 'blur(0px)' }} transition={{ duration: reduceMotion ? 0 : 0.78, delay: reduceMotion ? 0 : 0.43, ease: [0.16, 1, 0.3, 1] }}>altitude.</motion.span></span>
          </h1>
          <motion.div
            className="expedition-signup"
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>5 minutes every morning. Everything you need to know. Nothing you don&apos;t.</p>
            <NewsletterForm />
            <p className="expedition-context">Intelligence at the intersection of geopolitics, AI, and global finance.</p>
            <motion.div className="expedition-scroll" initial={false} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : 0.92 }}>
              <span>01</span><span>Scroll to explore <ArrowDownRight size={15} /></span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <Link href="/news" className="expedition-explore" aria-label="Explore the news archive"><ArrowUpRight size={20} /></Link>
      <div className="hero-values" aria-label="Altus editorial values">
        <div className="shell hero-values-inner">
          {values.map(({ icon: Icon, title, copy }) => <div className="hero-value" key={title}><Icon size={23} strokeWidth={1.35} /><div><strong>{title}</strong><span>{copy}</span></div></div>)}
        </div>
      </div>
    </section>
  )
}

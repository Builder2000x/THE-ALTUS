'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: .001 })
  if (reduceMotion) return null
  return <motion.div className="scroll-progress" style={{ scaleY }} aria-hidden="true" />
}

export function EditorialTicker() {
  const reduceMotion = useReducedMotion()
  const items = ['Independent reporting', 'Business', 'Culture', 'Ideas', 'The future is made', 'Altus News']
  const line = [...items, ...items]
  return <section className="editorial-ticker" aria-label="Altus topics"><div className={reduceMotion ? 'ticker-track static' : 'ticker-track'}>{line.map((item,index)=><span key={`${item}-${index}`}>{item}<Sparkles size={15}/></span>)}</div></section>
}

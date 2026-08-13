import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null); const isInView = useInView(ref, { once: true, margin: '-100px' })
  return <section ref={ref} id="about" className="about section-glow"><div className="section-inner">
    <motion.p className="eyebrow" initial={{opacity:0,y:20}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:.6}}>About us</motion.p>
    <motion.h2 initial={{opacity:0,y:40}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:.8, delay:.1}}>Pioneering <em>ideas</em> for<br className="desktop-break" /> minds that <em>create, build, and inspire.</em></motion.h2>
  </div></section>
}

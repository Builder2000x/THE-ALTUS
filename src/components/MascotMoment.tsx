'use client'

import { motion, useReducedMotion } from 'framer-motion'

type Props = { pose?: 'guide' | 'researcher'; className?: string }

export default function MascotMoment({ pose = 'guide', className = '' }: Props) {
  const reduceMotion = useReducedMotion()
  const src = pose === 'guide' ? '/mascots/altus-guide.png' : '/mascots/altus-researcher.png'
  return <motion.img
    className={`mascot-moment ${className}`}
    src={src}
    alt="Altus mountain goat mascot"
    initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: pose === 'guide' ? 2 : -2, filter: 'blur(5px)' }}
    whileInView={reduceMotion ? {} : { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount: .35 }}
    transition={{ type: 'spring', duration: .72, bounce: 0.06 }}
  />
}

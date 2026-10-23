'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { getImageProps } from 'next/image'

type Props = { pose?: 'guide' | 'researcher'; className?: string }

export default function MascotMoment({ pose = 'guide', className = '' }: Props) {
  const reduceMotion = useReducedMotion()
  const src = pose === 'guide' ? '/mascots/altus-guide.png' : '/mascots/altus-researcher.png'
  const { props } = getImageProps({ src, alt: 'Altus mountain goat mascot', width: 1024, height: 1024, sizes: '300px', loading: 'lazy' })
  return <motion.img
    src={props.src}
    srcSet={props.srcSet}
    sizes={props.sizes}
    width={props.width}
    height={props.height}
    loading={props.loading}
    decoding={props.decoding}
    alt={props.alt}
    className={`mascot-moment ${className}`}
    initial={false}
    whileInView={reduceMotion ? {} : { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount: .35 }}
    transition={{ type: 'spring', duration: .72, bounce: 0.06 }}
  />
}

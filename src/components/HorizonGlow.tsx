'use client'

import { useEffect, useRef } from 'react'

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.150'/%3E%3C/svg%3E")`

export default function HorizonGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const startedAt = performance.now()
    let frame = 0

    const paint = (now: number) => {
      const t = (now - startedAt) / 1000
      const ph = t * 0.72
      const amt = 0.62
      const dir = 1
      const spin = ph * dir
      const domeSwell = 1 + Math.sin(spin * 0.8) * amt * 0.07
      const backlightSwell = 1 + Math.sin(spin * 0.8) * amt * 0.35

      const domeWidth = 101 * domeSwell
      const domeHeight = 49 * domeSwell
      const backlightWidth = 42.42 * backlightSwell
      const backlightHeight = 18.62 * backlightSwell
      const reflectionWidth = 53.53 * backlightSwell
      const reflectionHeight = 28.42 * backlightSwell

      glow.style.backgroundImage = `${grain}, radial-gradient(${domeWidth}% ${domeHeight}% at 50% 100%, #fc8279 0%, #FB6A60 23.8%, #FDA096 51.4%, #F52929 79%, rgba(245, 41, 41, 0) 91%), radial-gradient(${backlightWidth}% ${backlightHeight}% at 50% 100%, rgba(252, 158, 152, 0.3672) 0%, rgba(251, 106, 96, 0.1428) 38%, rgba(251, 106, 96, 0) 72%), radial-gradient(${reflectionWidth}% ${reflectionHeight}% at 50% 100%, rgba(253, 160, 150, 0.1326) 0%, rgba(253, 160, 150, 0) 80%)`
      frame = requestAnimationFrame(paint)
    }

    frame = requestAnimationFrame(paint)
    return () => cancelAnimationFrame(frame)
  }, [])

  return <div ref={glowRef} className="horizon-glow" aria-hidden="true" />
}

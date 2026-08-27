'use client'

import { useEffect, useRef } from 'react'
import styles from './VideoPage.module.css'

type Point = { x: number; y: number; vx: number; vy: number }
type Ribbon = { points: Point[]; spring: number; friction: number; alpha: number }

const createRibbons = (x: number, y: number): Ribbon[] =>
  Array.from({ length: 18 }, (_, index) => ({
    spring: 0.115 + index * 0.0016,
    friction: 0.81 + index * 0.0015,
    alpha: 0.032 + index * 0.0024,
    points: Array.from({ length: 28 }, () => ({ x, y, vx: 0, vy: 0 })),
  }))

export default function VideoHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !hero || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let width = 0
    let height = 0
    let targetX = 0
    let targetY = 0
    let ribbons: Ribbon[] = []
    let activeUntil = 0

    const paint = () => {
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'multiply'

      ribbons.forEach((ribbon) => {
        let spring = ribbon.spring
        ribbon.points.forEach((point, pointIndex) => {
          const leader = pointIndex === 0
            ? { x: targetX, y: targetY, vx: 0, vy: 0 }
            : ribbon.points[pointIndex - 1]

          point.vx += (leader.x - point.x) * spring
          point.vy += (leader.y - point.y) * spring
          if (pointIndex > 0) {
            point.vx += leader.vx * 0.035
            point.vy += leader.vy * 0.035
          }
          point.vx *= ribbon.friction
          point.vy *= ribbon.friction
          point.x += point.vx
          point.y += point.vy
          spring *= 0.968
        })

        context.beginPath()
        context.moveTo(ribbon.points[0].x, ribbon.points[0].y)
        for (let index = 1; index < ribbon.points.length - 1; index += 1) {
          const point = ribbon.points[index]
          const next = ribbon.points[index + 1]
          context.quadraticCurveTo(
            point.x,
            point.y,
            (point.x + next.x) / 2,
            (point.y + next.y) / 2,
          )
        }
        context.strokeStyle = `rgba(72, 132, 176, ${ribbon.alpha})`
        context.lineWidth = 1.2
        context.stroke()
      })
    }

    const settle = (time: number) => {
      paint()
      if (time < activeUntil) frame = window.requestAnimationFrame(settle)
    }

    const placeRibbon = () => {
      const compact = width < 720
      const startX = width * (compact ? 1.05 : 0.82)
      const startY = height * (compact ? 0.69 : 0.55)
      targetX = startX
      targetY = startY
      ribbons = createRibbons(startX, startY)

      ribbons.forEach((ribbon, ribbonIndex) => {
        ribbon.points.forEach((point, pointIndex) => {
          const distance = pointIndex * (compact ? 12 : 17)
          point.x = startX - distance
          point.y = startY + Math.sin(pointIndex * 0.34 + ribbonIndex * 0.08) * (compact ? 24 + ribbonIndex * 1.5 : 34 + ribbonIndex * 2.2)
        })
      })
      paint()
    }

    const resize = () => {
      const rect = hero.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      placeRibbon()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType === 'touch') return
      const rect = hero.getBoundingClientRect()
      targetX = event.clientX - rect.left
      targetY = event.clientY - rect.top
      activeUntil = performance.now() + 850
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(settle)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(hero)
    hero.addEventListener('pointermove', onPointerMove, { passive: true })
    resize()

    return () => {
      observer.disconnect()
      hero.removeEventListener('pointermove', onPointerMove)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className={styles.hero} ref={heroRef} aria-labelledby="video-hero-title">
      <svg className={styles.waveField} viewBox="0 0 1400 800" preserveAspectRatio="none" aria-hidden="true">
        <path d="M520 590 C650 440 760 730 900 560 S1160 420 1420 600" />
        <path d="M500 606 C645 456 760 745 906 576 S1170 437 1420 618" />
        <path d="M480 622 C640 472 760 760 912 592 S1180 454 1420 636" />
        <path d="M460 638 C635 488 760 775 918 608 S1190 471 1420 654" />
        <path d="M440 654 C630 504 760 790 924 624 S1200 488 1420 672" />
      </svg>
      <canvas className={styles.canvas} ref={canvasRef} aria-hidden="true" />
      <div className={styles.heroGlow} aria-hidden="true" />

      <div className={`shell ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>Altus films</p>
          <h1 id="video-hero-title">Stories,<br /><em>in motion.</em></h1>
          <p className={styles.heroDeck}>
            Original reporting, thoughtful conversations and visual stories about the forces shaping our world.
          </p>
          <a className={styles.heroCta} href="#latest-videos">
            Watch the latest <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.heroNote} aria-hidden="true">
          <span>01</span>
          <i />
          <span>Visual journalism</span>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Minimal custom cursor: a small dot with a trailing ring that expands over
 * interactive elements. Desktop (fine pointer) only; steps aside entirely
 * for touch devices and reduced-motion visitors.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [hovering, setHovering] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover) return
    setActive(true)

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    const move = (e: MouseEvent) => {
      setRevealed(true)
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(Boolean(target.closest('a, button, [data-cursor-hover]')))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
    }
  }, [reducedMotion])

  if (!active) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] hidden md:block ${revealed ? '' : 'opacity-0'}`}
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/70 transition-[width,height,opacity] duration-300 ${
          hovering ? 'size-12 opacity-100' : 'size-8 opacity-50'
        }`}
      />
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400 transition-[width,height] duration-300 ${
          hovering ? 'size-1.5' : 'size-1'
        }`}
      />
    </div>
  )
}

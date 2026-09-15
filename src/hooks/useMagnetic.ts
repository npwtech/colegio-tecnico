import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from './useReducedMotion'

/**
 * Subtle magnetic-hover effect: the element eases toward the cursor while
 * it's within its own bounds, and eases back out on leave. Disabled for
 * touch devices and reduced-motion visitors.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.3) {
  const ref = useRef<T | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return
    if (window.matchMedia('(hover: none)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = event.clientX - rect.left - rect.width / 2
      const relY = event.clientY - rect.top - rect.height / 2
      xTo(relX * strength)
      yTo(relY * strength)
    }
    const handleLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [reducedMotion, strength])

  return ref
}

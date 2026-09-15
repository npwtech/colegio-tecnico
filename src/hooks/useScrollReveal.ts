import { useRef } from 'react'
import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { usePrefersReducedMotion } from './useReducedMotion'

interface ScrollRevealOptions {
  /** CSS selector (scoped to the returned ref) for the elements to reveal. */
  selector: string
  start?: string
  stagger?: number
  y?: number
  duration?: number
}

/** Fades/rises a group of elements into place the first time their
 * container scrolls into view. No-ops entirely for reduced-motion. */
export function useScrollReveal<T extends HTMLElement>({
  selector,
  start = 'top 78%',
  stagger = 0.1,
  y = 32,
  duration = 0.9,
}: ScrollRevealOptions): RefObject<T | null> {
  const scopeRef = useRef<T | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) return
      const targets = gsap.utils.toArray<HTMLElement>(selector, scopeRef.current)
      if (!targets.length) return

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        ease: 'power3.out',
        stagger,
        scrollTrigger: {
          trigger: scopeRef.current,
          start,
          once: true,
        },
      })
    },
    { scope: scopeRef, dependencies: [reducedMotion] },
  )

  return scopeRef
}

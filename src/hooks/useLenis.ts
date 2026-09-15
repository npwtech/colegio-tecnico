import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerGsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from './useReducedMotion'

/**
 * Boots Lenis smooth-scroll and wires its RAF loop into GSAP's ticker so
 * ScrollTrigger stays perfectly in sync with the smoothed scroll position.
 * Mount once near the app root. Falls back to plain native scrolling when
 * the visitor prefers reduced motion.
 */
export function useLenis() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    registerGsap()

    if (reducedMotion) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    })

    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [reducedMotion])
}

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from './useReducedMotion'

/** Subtle pointer-driven 3D tilt for cards — desktop, fine-pointer only. */
export function useTilt<T extends HTMLElement>(maxDeg = 6) {
  const ref = useRef<T | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const rotateX = gsap.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power3.out' })
    const rotateY = gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power3.out' })
    const scale = gsap.quickTo(el, 'scale', { duration: 0.4, ease: 'power3.out' })

    gsap.set(el, { transformPerspective: 800, transformStyle: 'preserve-3d' })

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      rotateY(px * maxDeg * 2)
      rotateX(py * -maxDeg * 2)
      scale(1.015)
    }
    const handleLeave = () => {
      rotateX(0)
      rotateY(0)
      scale(1)
    }

    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [reducedMotion, maxDeg])

  return ref
}

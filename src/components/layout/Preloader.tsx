import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { Logo } from '@/components/ui/Logo'

interface PreloaderProps {
  onComplete: () => void
}

/** Brief branded curtain: draws the mark in, fills a hairline progress bar,
 * then wipes upward to reveal the header/hero entrance underneath. */
export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [done, setDone] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) {
        onComplete()
        setDone(true)
        return
      }

      gsap
        .timeline({ onComplete: () => setDone(true) })
        .set(rootRef.current, { autoAlpha: 1 })
        .from('[data-preloader-mark]', { opacity: 0, scale: 0.82, duration: 0.5, ease: 'power2.out' })
        .to('[data-preloader-bar-fill]', { scaleX: 1, duration: 0.85, ease: 'power2.inOut' }, '-=0.15')
        .to('[data-preloader-mark], [data-preloader-bar]', { opacity: 0, duration: 0.3 }, '+=0.05')
        .add(() => onComplete())
        .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.05')
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  )

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="invisible fixed inset-0 z-[200] flex flex-col items-center justify-center gap-7 bg-navy-950"
      aria-hidden="true"
    >
      <div data-preloader-mark>
        <Logo markSize={52} />
      </div>
      <div data-preloader-bar className="h-px w-40 overflow-hidden bg-white/10">
        <div data-preloader-bar-fill className="h-full w-full origin-left scale-x-0 bg-gold-400" />
      </div>
    </div>
  )
}

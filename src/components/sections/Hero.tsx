import { lazy, Suspense, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useIntroReady } from '@/lib/introContext'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { splitWords } from '@/lib/splitText'
import { scrollToSection } from '@/lib/scroll'
import { FallbackGlow } from '@/components/three/FallbackGlow'
import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

const HeroCanvas = lazy(() => import('@/components/three/HeroCanvas').then((m) => ({ default: m.HeroCanvas })))

const TRUST_ITEMS = ['Professores experientes', 'Turmas reduzidas', 'Aulas práticas']

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const line1Ref = useRef<HTMLSpanElement | null>(null)
  const line2Ref = useRef<HTMLSpanElement | null>(null)
  const scrollProgress = useRef(0)

  const introReady = useIntroReady()
  const reducedMotion = usePrefersReducedMotion()

  // Cinematic entrance: headline masks rise in, then the rest fades up.
  useGSAP(
    () => {
      if (!introReady) return

      const words = line1Ref.current ? splitWords(line1Ref.current) : []
      const targets = [...words, line2Ref.current].filter(Boolean)

      gsap.set(targets, { yPercent: 120 })
      gsap.to(targets, {
        yPercent: 0,
        duration: 1.15,
        ease: 'power4.out',
        stagger: 0.045,
        delay: 0.15,
      })

      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 22,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.75,
      })
    },
    { scope: contentRef, dependencies: [introReady] },
  )

  // The hero gently dissolves/parallaxes as the next section approaches,
  // and feeds the same progress into the 3D scene for a coordinated effect.
  useGSAP(
    () => {
      if (reducedMotion) return
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress
          gsap.set(contentRef.current, {
            yPercent: self.progress * -18,
            opacity: 1 - self.progress * 0.85,
          })
        },
      })
      return () => trigger.kill()
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="bg-grid relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-[-10%] size-[60vw] rounded-full bg-navy-600/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] size-[50vw] rounded-full bg-gold-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-950" />
      </div>

      <Suspense fallback={<FallbackGlow />}>
        <HeroCanvas scrollProgress={scrollProgress} />
      </Suspense>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36 sm:px-10 sm:pt-40"
      >
        <div className="max-w-3xl">
          <div
            data-hero-fade
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-subtitle text-xs font-semibold uppercase tracking-[0.25em] text-gold-300"
          >
            <span className="size-1.5 rounded-full bg-gold-400" />
            Escola de tecnologia e inovação
          </div>

          <h1 className="font-display text-[clamp(2.6rem,9vw,6rem)] font-extrabold leading-[0.98] text-white">
            <span ref={line1Ref} className="block">
              Tecnologia para todas as
            </span>
            <span className="block overflow-hidden pb-2">
              <span ref={line2Ref} className="text-gradient-gold inline-block">
                gerações.
              </span>
            </span>
          </h1>

          <p data-hero-fade className="mt-7 max-w-xl font-sans text-base leading-relaxed text-mist-300 sm:text-lg">
            Conhecimento que transforma. Tecnologia que prepara. Futuro que começa agora.
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
            <Button onClick={() => scrollToSection('#cursos')} variant="primary">
              Conheça os cursos
            </Button>
            <WhatsAppButton label="Fale no WhatsApp" />
          </div>

          <ul data-hero-fade className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2 font-subtitle text-sm text-mist-300">
                <svg viewBox="0 0 20 20" fill="none" className="size-4 shrink-0 text-gold-400">
                  <path d="M4 10.5 8 14.5 16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        data-hero-fade
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="font-subtitle text-[0.65rem] font-medium uppercase tracking-[0.3em] text-mist-500">
          Role para explorar
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          {!reducedMotion && (
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-gold-400" />
          )}
        </span>
      </div>

      <style>{`
        @keyframes scrollcue {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(150%); }
          100% { transform: translateY(150%); }
        }
      `}</style>
    </section>
  )
}

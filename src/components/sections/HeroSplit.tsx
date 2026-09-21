import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useIntroReady } from '@/lib/introContext'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { splitWords } from '@/lib/splitText'
import { scrollToSection } from '@/lib/scroll'
import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { PHOTOS } from '@/data/media'

const TRUST_ITEMS = ['Professores experientes', 'Turmas reduzidas', 'Aulas 100% práticas']

/** Hero section: a photo on the right side that dissolves into the navy
 * background behind the copy. */
export function HeroSplit() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  // Mobile headline: forced 4-line break.
  const mLine1Ref = useRef<HTMLSpanElement | null>(null)
  const mLine2Ref = useRef<HTMLSpanElement | null>(null)
  const mLine3Ref = useRef<HTMLSpanElement | null>(null)
  const mLine4Ref = useRef<HTMLSpanElement | null>(null)
  // Desktop headline: original 2-line layout.
  const dLine1Ref = useRef<HTMLSpanElement | null>(null)
  const dLine2Ref = useRef<HTMLSpanElement | null>(null)

  const introReady = useIntroReady()
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!introReady) return

      const dWords = dLine1Ref.current ? splitWords(dLine1Ref.current) : []
      const mWords = [mLine1Ref, mLine2Ref].flatMap((ref) => (ref.current ? splitWords(ref.current) : []))
      const words = [...dWords, dLine2Ref.current, ...mWords, mLine3Ref.current, mLine4Ref.current].filter(Boolean)

      gsap.set(words, { yPercent: 120 })
      gsap.to(words, {
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

      gsap.from('[data-hero-image]', {
        opacity: 0,
        scale: 1.06,
        duration: 1.6,
        ease: 'power3.out',
      })
    },
    // `data-hero-image` lives outside contentRef (it's a sibling under the
    // section), so the scope has to be the whole section for that selector
    // to resolve.
    { scope: sectionRef, dependencies: [introReady] },
  )

  // Same dissolve-on-scroll behaviour as the original hero, just without the
  // 3D scene to hand progress to.
  useGSAP(
    () => {
      if (reducedMotion) return
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
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
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950"
    >
      {/* Anchored to the right edge and capped in width so the boy's face
          always lands over the photo panel, never under the copy column. */}
      <div data-hero-image className="absolute inset-0 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[48%]">
        <img
          src={PHOTOS.heroKidRobotics.src}
          alt={PHOTOS.heroKidRobotics.alt}
          className="size-full object-cover object-[14%_16%] lg:object-[0%_20%]"
        />
        {/* Long, gradual dissolve reaching almost up to the boy himself. */}
        <div className="hero-photo-fade-x absolute inset-0" />
        <div className="hero-photo-fade-y absolute inset-0" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-[-10%] size-[50vw] rounded-full bg-navy-600/30 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-950" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36 sm:px-10 sm:pt-40"
      >
        <div className="max-w-xl">
          <div
            data-hero-fade
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-navy-950/40 px-3 py-1 font-subtitle text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-300 shadow-[0_0_24px_-10px_rgba(255,209,0,0.6)] backdrop-blur-sm lg:mb-7 lg:gap-2.5 lg:px-4 lg:py-1.5 lg:text-xs lg:tracking-[0.25em]"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-gold-400" />
            </span>
            Matrículas abertas
          </div>

          <h1 className="font-display font-extrabold leading-[0.98] text-white">
            {/* Mobile/tablet: forced 4-line break, slightly smaller size. The
                gold lines are kept as whole (un-word-split) blocks — nesting
                the word-mask spans from splitWords inside a
                background-clip:text element makes the gradient text render
                invisible in some browsers. */}
            <span className="block text-[clamp(2.475rem,8vw,5.375rem)] lg:hidden">
              <span ref={mLine1Ref} className="block">
                Tecnologia
              </span>
              <span ref={mLine2Ref} className="block">
                na prática,
              </span>
              <span className="block overflow-hidden pb-2">
                <span ref={mLine3Ref} className="text-gradient-gold inline-block italic">
                  para todas
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span ref={mLine4Ref} className="text-gradient-gold inline-block italic">
                  as idades.
                </span>
              </span>
            </span>

            {/* Desktop: original 2-line layout. */}
            <span className="hidden text-[clamp(2.6rem,8vw,5.5rem)] lg:block">
              <span ref={dLine1Ref} className="block">
                Tecnologia na prática,
              </span>
              <span className="block overflow-hidden pb-2">
                <span ref={dLine2Ref} className="text-gradient-gold inline-block italic">
                  para todas as idades.
                </span>
              </span>
            </span>
          </h1>

          <p data-hero-fade className="mt-7 hidden max-w-lg font-sans text-base leading-relaxed text-mist-300 sm:text-lg lg:block">
            Informática, robótica e montagem de computadores com aulas práticas, turmas reduzidas e professores
            experientes, no coração de Jardim Primavera. Da criança que monta o primeiro robô ao vovô que quer
            dominar o celular.
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
            <WhatsAppButton label="Falar no WhatsApp" />
            <Button onClick={() => scrollToSection('#cursos')} variant="primary">
              Ver os cursos
            </Button>
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

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

const STEPS = [
  {
    title: 'Aula prática desde o primeiro dia',
    description:
      'Nada de aula só na teoria: você coloca a mão no computador, na peça ou no robô já nos primeiros encontros, no laboratório da SEFTI.',
  },
  {
    title: 'Acompanhamento em turma reduzida',
    description:
      'Turmas pequenas para que o professor consiga acompanhar o ritmo de cada aluno de perto, sem deixar dúvida para trás.',
  },
  {
    title: 'Apostila própria como guia',
    description:
      'Material desenvolvido pela própria SEFTI, organizado passo a passo para acompanhar a evolução do curso do início ao fim.',
  },
  {
    title: 'Preparado para o que vem depois',
    description:
      'Ao final, você sai com conhecimento aplicável de verdade — pronto para o mercado, para o dia a dia ou para o próximo curso.',
  },
]

export function Structure() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const headingRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]' })

  useGSAP(
    () => {
      if (reducedMotion) return
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current
        const container = containerRef.current
        if (!track || !container) return

        const getDistance = () => Math.max(0, track.scrollWidth - container.clientWidth)

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActiveStep(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)))
            },
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      id="estrutura"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-900 py-28 sm:py-36 lg:flex lg:h-screen lg:flex-col lg:py-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950 to-transparent sm:h-44 lg:h-56" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />

      <div ref={headingRef} className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:pt-28">
        <div data-reveal className="max-w-2xl">
          <SectionHeading
            eyebrow="Estrutura"
            title="Uma metodologia que evolui com você."
            description="Da primeira aula ao último projeto, a experiência na SEFTI foi desenhada como uma jornada — não como uma lista de conteúdos soltos."
          />
        </div>
      </div>

      <div ref={containerRef} className="relative mt-12 lg:mt-10 lg:flex-1 lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 sm:px-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:px-10"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              data-reveal
              className={`relative flex shrink-0 flex-col justify-center rounded-3xl border p-9 transition-colors duration-500 sm:p-10 lg:h-[62%] lg:w-[min(78vw,32rem)] ${
                activeStep === i ? 'border-gold-400/50 bg-white/[0.06]' : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <span className="font-display text-5xl font-extrabold text-white/10 sm:text-6xl">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                {step.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-mist-300 sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden items-center justify-center gap-2 pb-10 lg:flex">
        {STEPS.map((step, i) => (
          <span
            key={step.title}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              activeStep === i ? 'w-8 bg-gold-400' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

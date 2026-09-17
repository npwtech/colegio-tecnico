import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WebGLImage } from '@/components/three/WebGLImage'
import { PHOTOS } from '@/data/media'

const STEPS = [
  {
    title: 'Laboratório completo',
    description: 'Computadores modernos com SSD e monitores de qualidade — um por aluno, sem revezamento.',
    photo: PHOTOS.labKids,
  },
  {
    title: 'Salas climatizadas',
    description: 'Ambientes com ar-condicionado para estudar com conforto em qualquer época do ano.',
    photo: PHOTOS.classroom,
  },
  {
    title: 'Segurança monitorada',
    description: 'Circuito completo de câmeras internas e externas, para a tranquilidade das famílias.',
    photo: PHOTOS.security,
  },
  {
    title: 'Bancada de montagem',
    description: 'Sala dedicada, com equipamentos reais, para as aulas práticas de montagem e manutenção.',
    photo: PHOTOS.workbenchSolder,
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
            title="Estrutura preparada para você aprender de verdade."
            description="Investimos em cada detalhe para oferecer a melhor experiência de aprendizado da região."
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
              className={`relative flex shrink-0 flex-col overflow-hidden rounded-3xl border p-6 transition-colors duration-500 sm:p-7 lg:min-h-[62%] lg:w-[min(78vw,32rem)] ${
                activeStep === i ? 'border-gold-400/50 bg-white/[0.06]' : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-2xl">
                <WebGLImage src={step.photo.src} alt={step.photo.alt} className="size-full" />
                <span className="absolute left-3 top-3 rounded-full bg-navy-950/70 px-3 py-1 font-display text-sm font-extrabold text-gold-400 backdrop-blur-sm">
                  0{i + 1}
                </span>
              </div>
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

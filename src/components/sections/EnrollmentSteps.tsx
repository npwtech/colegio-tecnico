import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/site-config'

const STEPS = [
  {
    number: 1,
    title: 'Chame no WhatsApp',
    description:
      'Clique em qualquer botão verde do site e fale direto com a nossa equipe. Tiramos todas as dúvidas sobre cursos, horários e valores.',
  },
  {
    number: 2,
    title: 'Visite a escola',
    description: `Venha conhecer nosso espaço em ${SITE.neighborhood}, ver o laboratório de perto e escolher a melhor turma para você.`,
  },
  {
    number: 3,
    title: 'Comece a estudar',
    description: 'Matrícula feita, material em mãos e aula prática desde o primeiro dia. Simples assim.',
  },
]

export function EnrollmentSteps() {
  const scopeRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.08 })

  return (
    <section className="relative overflow-hidden bg-navy-900 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950 to-transparent sm:h-44 lg:h-56" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />

      <div ref={scopeRef} className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div data-reveal>
          <SectionHeading
            align="center"
            eyebrow="Matrícula"
            title="Matrícula sem complicação."
            description="Em três passos simples você (ou alguém da sua família) já está estudando com a gente."
            className="mx-auto"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              data-reveal
              className="glass-panel relative rounded-2xl border border-white/10 p-7 pt-12"
            >
              <span className="absolute -top-5 left-7 flex size-10 items-center justify-center rounded-full bg-gold-400 font-display text-base font-extrabold text-navy-950">
                {step.number}
              </span>
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">{step.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-mist-300 sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { scrollToSection } from '@/lib/scroll'

const DIFFERENTIATORS = [
  {
    index: '01',
    title: 'Professores experientes',
    description: 'Um corpo docente que domina o conteúdo e sabe ensinar no ritmo de cada turma.',
  },
  {
    index: '02',
    title: 'Apostilas próprias',
    description: 'Material didático desenvolvido pela própria SEFTI, direto ao ponto e fácil de acompanhar.',
  },
  {
    index: '03',
    title: 'Laboratório moderno',
    description: 'Estrutura equipada para aulas práticas de informática, robótica e manutenção.',
  },
  {
    index: '04',
    title: 'Turmas reduzidas',
    description: 'Menos alunos por turma significa mais atenção individual e mais aprendizado real.',
  },
  {
    index: '05',
    title: 'Inclusão digital',
    description: 'Tecnologia explicada de forma acessível, das primeiras infâncias à terceira idade.',
  },
  {
    index: '06',
    title: 'Preparação para o futuro',
    description: 'Conteúdo atual, pensado para o mercado e para o dia a dia com tecnologia.',
  },
]

export function About() {
  const scopeRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.08 })

  return (
    <section id="sobre" className="relative overflow-hidden bg-navy-900 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.15]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Sobre a SEFTI"
            title="Uma escola pensada para todas as gerações."
            description="A SEFTI — Sistema Educacional Focado em Tecnologia e Inovação — nasce da ideia de que tecnologia não tem idade certa para ser aprendida. Ensinamos informática, robótica e manutenção de computadores com uma didática próxima, prática e acessível, para que crianças, adolescentes, jovens, adultos e a terceira idade cheguem mais preparados para o futuro."
          />
          <div className="mt-10">
            <Button variant="outline" onClick={() => scrollToSection('#contato')}>
              Fale com a SEFTI
            </Button>
          </div>
        </div>

        <div ref={scopeRef} className="relative border-l border-white/10 pl-8 sm:pl-10">
          {DIFFERENTIATORS.map((item) => (
            <div key={item.index} data-reveal className="relative pb-10 last:pb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full border-2 border-gold-400 bg-navy-900 sm:-left-[calc(2.5rem+5px)]" />
              <span className="font-subtitle text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
                {item.index}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">{item.title}</h3>
              <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-mist-300 sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

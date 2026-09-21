import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { TiltImage } from '@/components/ui/TiltImage'
import { PHOTOS } from '@/data/media'
import { scrollToSection } from '@/lib/scroll'

const DIFFERENTIATORS = [
  {
    index: '01',
    title: 'Professores experientes',
    description:
      'Direção e corpo docente formados por professores atuantes em escolas de ensino fundamental e médio da região.',
  },
  {
    index: '02',
    title: 'Apostilas próprias',
    description: 'Apostilas exclusivas, desenvolvidas pela própria SEFTI, direto ao ponto e fácil de acompanhar.',
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950 to-transparent sm:h-44 lg:h-56" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.15]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Sobre a SEFTI"
            title="Uma escola feita por professor, para a nossa comunidade."
            description="A SEFTI nasceu do sonho de um professor com anos de sala de aula em colégios da região: levar ensino de tecnologia de qualidade para Jardim Primavera, sem que ninguém precise atravessar a cidade para aprender."
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="outline" onClick={() => scrollToSection('#contato')}>
              Agendar uma visita
            </Button>
          </div>

          <div className="relative mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden rounded-3xl border border-white/10 lg:block">
            <TiltImage src={PHOTOS.studentsComputers.src} alt={PHOTOS.studentsComputers.alt} className="size-full" />
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

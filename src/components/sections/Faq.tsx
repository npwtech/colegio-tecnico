import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ChevronDownIcon } from '@/components/ui/icons'

const FAQS = [
  {
    question: 'Preciso ter computador em casa para fazer os cursos?',
    answer:
      'Não! Todas as aulas acontecem no nosso laboratório, com um computador por aluno. Ter computador em casa ajuda a praticar, mas não é obrigatório.',
  },
  {
    question: 'Nunca mexi em computador. Consigo acompanhar?',
    answer:
      'Consegue, sim. Nossos cursos de Informática Básica e da linha para a terceira idade começam do absoluto zero, com turmas reduzidas e ritmo adaptado a cada aluno.',
  },
  {
    question: 'A partir de qual idade meu filho pode fazer robótica?',
    answer:
      'Temos duas turmas: Robótica para Crianças e Robótica para Adolescentes, cada uma com projetos adequados à faixa etária. Chame no WhatsApp com a idade do seu filho que indicamos a turma ideal.',
  },
  {
    question: 'O aluno leva o robô montado para casa?',
    answer:
      'Sim! Nos cursos de robótica, cada aluno tem seu próprio kit, incluso na matrícula, e leva para casa os robôs que montar durante o curso.',
  },
  {
    question: 'Quais são os valores e formas de pagamento?',
    answer:
      'As condições variam conforme o curso, e as turmas de inauguração contam com oferta especial por tempo limitado. Fale com a gente no WhatsApp para receber a tabela atualizada.',
  },
  {
    question: 'Tem certificado no final do curso?',
    answer:
      'Tem, sim. Ao concluir o curso, o aluno recebe certificado de conclusão para valorizar o currículo e comprovar as novas habilidades.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const scopeRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.08 })

  return (
    <section id="faq" className="relative overflow-hidden bg-navy-950 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-900 to-transparent sm:h-44 lg:h-56" />

      <div ref={scopeRef} className="relative mx-auto max-w-3xl px-6 sm:px-10">
        <div data-reveal>
          <SectionHeading
            align="center"
            eyebrow="Dúvidas frequentes"
            title="Perguntas que a gente mais escuta."
            description="Se a sua dúvida não estiver aqui, fale com a gente no WhatsApp."
            className="mx-auto"
          />
        </div>

        <div className="mt-14 flex flex-col gap-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={faq.question}
                data-reveal
                className={`glass-panel overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? 'border-gold-400/40' : 'border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                >
                  <span className="font-display text-base font-bold text-white sm:text-lg">{faq.question}</span>
                  <ChevronDownIcon
                    className={`size-4 shrink-0 text-mist-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-gold-400' : ''
                    }`}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 font-sans text-sm leading-relaxed text-mist-300 sm:px-8 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

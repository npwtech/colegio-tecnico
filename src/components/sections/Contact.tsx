import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { SITE } from '@/lib/site-config'
import { InstagramIcon, MapPinIcon, GlobeIcon } from '@/components/ui/icons'

export function Contact() {
  const scopeRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.08 })

  return (
    <section id="contato" className="relative overflow-hidden bg-navy-950 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-900 to-transparent sm:h-44 lg:h-56" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 size-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-600/40 blur-[140px]" />
      </div>

      <div ref={scopeRef} className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
        <div data-reveal>
          <SectionHeading
            align="center"
            eyebrow="Matricule-se"
            title="Pronto para dar o próximo passo com a tecnologia?"
            description="Fale agora pelo WhatsApp e descubra o curso certo para o seu momento — ou o da sua família."
            className="mx-auto"
          />
        </div>

        <div data-reveal className="mt-10 flex justify-center">
          <WhatsAppButton label="Falar no WhatsApp agora" />
        </div>

        <div
          data-reveal
          className="glass-panel mt-16 grid grid-cols-1 gap-8 rounded-3xl p-8 text-left sm:grid-cols-3 sm:p-10"
        >
          <div className="flex items-start gap-3">
            <MapPinIcon className="mt-0.5 size-5 shrink-0 text-gold-400" />
            <div>
              <p className="font-subtitle text-xs font-semibold uppercase tracking-[0.2em] text-mist-500">Endereço</p>
              <p className="mt-1 font-sans text-sm text-mist-100">
                {SITE.city}, {SITE.state}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <InstagramIcon className="mt-0.5 size-5 shrink-0 text-gold-400" />
            <div>
              <p className="font-subtitle text-xs font-semibold uppercase tracking-[0.2em] text-mist-500">Instagram</p>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block font-sans text-sm text-mist-100 hover:text-gold-300"
              >
                {SITE.instagramHandle}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GlobeIcon className="mt-0.5 size-5 shrink-0 text-gold-400" />
            <div>
              <p className="font-subtitle text-xs font-semibold uppercase tracking-[0.2em] text-mist-500">Site</p>
              <a
                href={SITE.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block font-sans text-sm text-mist-100 hover:text-gold-300"
              >
                {SITE.url.replace('https://', '')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

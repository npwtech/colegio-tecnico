import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TiltImage } from '@/components/ui/TiltImage'
import { PHOTOS } from '@/data/media'

const TILES = [
  { photo: PHOTOS.labWide, span: 'lg:col-span-2 lg:row-span-2' },
  { photo: PHOTOS.kidsRobotics, span: 'lg:row-span-2' },
  { photo: PHOTOS.seniorPhone, span: '' },
  { photo: PHOTOS.workbenchTech, span: '' },
  { photo: PHOTOS.seniorLaptop, span: 'sm:col-span-2 lg:col-span-1' },
  { photo: PHOTOS.kidsRoboticsHands, span: '' },
]

export function SchoolGallery() {
  const scopeRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.07 })

  return (
    <section id="conheca" className="relative overflow-hidden bg-navy-900 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950 to-transparent sm:h-44 lg:h-56" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.12]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div data-reveal>
          <SectionHeading
            eyebrow="Conheça nossa escola"
            title="Aulas de verdade, no dia a dia da nossa unidade."
            description="Passe o mouse pelas fotos — laboratório, robótica, bancada de montagem e turmas de todas as idades, dentro da SEFTI."
          />
        </div>

        <div
          ref={scopeRef}
          className="mt-14 grid grid-flow-dense grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
        >
          {TILES.map(({ photo, span }) => (
            <div key={photo.alt} data-reveal className={`h-48 sm:h-56 lg:h-auto lg:min-h-[220px] ${span}`}>
              <TiltImage src={photo.src} alt={photo.alt} className="size-full rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

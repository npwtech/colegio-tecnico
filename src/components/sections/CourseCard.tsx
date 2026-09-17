import { useRef } from 'react'
import { Flip, useGSAP } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { AUDIENCE_LABEL, type Course } from '@/data/courses'
import { PHOTOS } from '@/data/media'
import { WebGLImage } from '@/components/three/WebGLImage'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { CloseIcon } from '@/components/ui/icons'

interface CourseCardProps {
  course: Course
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

/**
 * Doubles as its own detail modal: clicking "Ver detalhes" flips this same
 * card element into a fullscreen panel via GSAP Flip (captured rect ->
 * fullscreen rect -> animated tween), the way Apple's product cards expand
 * in place instead of opening a separate dialog.
 */
export function CourseCard({ course, isOpen, onOpen, onClose }: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null)
  const photo = PHOTOS[course.photo]

  const captureAndToggle = (action: () => void) => {
    if (cardRef.current && !reducedMotion) {
      flipStateRef.current = Flip.getState(cardRef.current, { props: 'borderRadius' })
    }
    action()
  }

  useGSAP(
    () => {
      if (!flipStateRef.current) return
      Flip.from(flipStateRef.current, {
        duration: 0.6,
        ease: 'power3.inOut',
        absolute: true,
        scale: true,
      })
      flipStateRef.current = null
    },
    { dependencies: [isOpen] },
  )

  return (
    <div
      ref={cardRef}
      data-course-card
      role={isOpen ? 'dialog' : undefined}
      aria-modal={isOpen ? true : undefined}
      aria-label={isOpen ? course.title : undefined}
      className={
        isOpen
          ? 'fixed inset-4 z-50 overflow-y-auto rounded-3xl border border-gold-400/40 bg-navy-900 p-7 shadow-2xl sm:inset-8 sm:p-9 md:inset-x-[12%] md:inset-y-10 lg:inset-x-[22%]'
          : 'group relative flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 transition-colors duration-300 hover:border-gold-400/40'
      }
    >
      {isOpen ? (
        <>
          <button
            onClick={() => captureAndToggle(onClose)}
            aria-label="Fechar detalhes do curso"
            className="absolute right-5 top-5 z-10 flex size-9 items-center justify-center rounded-full bg-navy-950/70 text-white backdrop-blur-sm transition-colors hover:text-gold-400"
          >
            <CloseIcon className="size-4" />
          </button>

          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <WebGLImage src={photo.src} alt={photo.alt} className="size-full" />
          </div>

          <span className="mt-6 font-display text-3xl font-extrabold text-white/15">{course.index}</span>
          <h3 className="mt-2 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">{course.title}</h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {course.audience.map((a) => (
              <span
                key={a}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-subtitle text-[0.65rem] font-medium uppercase tracking-wide text-mist-300"
              >
                {AUDIENCE_LABEL[a]}
              </span>
            ))}
          </div>

          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-mist-300 sm:text-base">{course.summary}</p>

          <ul className="mt-6 grid gap-2.5 border-t border-white/10 pt-6 sm:grid-cols-2">
            {course.topics.map((topic) => (
              <li key={topic} className="flex items-start gap-2.5 font-sans text-sm text-mist-300">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-gold-400" />
                {topic}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <WhatsAppButton label="Falar sobre esse curso" message={`Olá! Tenho interesse no curso de ${course.title}.`} />
          </div>
        </>
      ) : (
        <>
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <WebGLImage src={photo.src} alt={photo.alt} className="size-full" />
          </div>

          <div className="mt-5 flex items-start justify-between">
            <span className="font-display text-2xl font-extrabold text-white/15">{course.index}</span>
            <div className="flex flex-wrap justify-end gap-1.5">
              {course.audience.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-subtitle text-[0.65rem] font-medium uppercase tracking-wide text-mist-300"
                >
                  {AUDIENCE_LABEL[a]}
                </span>
              ))}
            </div>
          </div>

          <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">{course.title}</h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-mist-300">{course.summary}</p>

          <button
            onClick={() => captureAndToggle(onOpen)}
            className="mt-6 flex items-center gap-2 font-subtitle text-xs font-semibold uppercase tracking-[0.2em] text-gold-400"
          >
            Ver detalhes
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

          <span className="pointer-events-none absolute inset-x-7 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
        </>
      )}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Flip, gsap, useGSAP } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AUDIENCE_FILTERS, COURSES, type Audience } from '@/data/courses'
import { CourseCard } from './CourseCard'

// Matches CourseCard's Flip close duration (0.6s), plus a small buffer, so
// the backdrop only lifts once the card has actually finished shrinking back
// into the grid — otherwise the dim/blur clears while the card is still
// mid-shrink and briefly flashes the neighboring cards at full brightness.
const CLOSE_ANIMATION_MS = 650

export function Courses() {
  const [filter, setFilter] = useState<Audience | 'todos'>('todos')
  const [openCourseId, setOpenCourseId] = useState<string | null>(null)
  const [closingCourseId, setClosingCourseId] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reducedMotion = usePrefersReducedMotion()
  const headingRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.08 })

  const visibleCourses = filter === 'todos' ? COURSES : COURSES.filter((c) => c.audience.includes(filter))

  const handleFilter = (id: Audience | 'todos') => {
    if (id === filter) return
    setOpenCourseId(null)
    if (gridRef.current && !reducedMotion) {
      flipStateRef.current = Flip.getState(gridRef.current.querySelectorAll('[data-course-card]'))
    }
    setFilter(id)
  }

  const handleCloseCourse = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    if (openCourseId && !reducedMotion) {
      setClosingCourseId(openCourseId)
      closeTimeoutRef.current = setTimeout(() => setClosingCourseId(null), CLOSE_ANIMATION_MS)
    }
    setOpenCourseId(null)
  }

  useEffect(() => () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
  }, [])

  useGSAP(
    () => {
      if (!flipStateRef.current) return
      Flip.from(flipStateRef.current, {
        duration: 0.65,
        ease: 'power3.inOut',
        stagger: 0.03,
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.04 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.25 }),
      })
      flipStateRef.current = null
    },
    { dependencies: [filter] },
  )

  // Locks scroll (and Lenis) while a course's detail panel is open, and lets
  // Escape close it like any modal.
  useEffect(() => {
    if (!openCourseId) return

    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleCloseCourse()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
      window.removeEventListener('keydown', handleKey)
    }
  }, [openCourseId])

  return (
    <section id="cursos" className="relative bg-navy-950 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-900 to-transparent sm:h-44 lg:h-56" />
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div ref={headingRef} className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal>
            <SectionHeading
              eyebrow="Nossos cursos"
              title={
                <>
                  Um curso para cada <span className="text-gradient-gold">momento da vida.</span>
                </>
              }
              description="Seis trilhas pensadas para idades e objetivos diferentes — da primeira infância à terceira idade."
            />
          </div>
        </div>

        <div data-reveal className="mt-10 flex flex-wrap gap-2.5">
          {AUDIENCE_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilter(f.id)}
              className={`rounded-full border px-4 py-2 font-subtitle text-sm font-medium transition-colors duration-300 ${
                filter === f.id
                  ? 'border-gold-400 bg-gold-400 text-navy-950'
                  : 'border-white/15 text-mist-300 hover:border-white/35 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isOpen={openCourseId === course.id}
              onOpen={() => setOpenCourseId(course.id)}
              onClose={handleCloseCourse}
            />
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm transition-opacity duration-200 ${
          openCourseId || closingCourseId ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleCloseCourse}
        aria-hidden="true"
      />
    </section>
  )
}

import { useState } from 'react'
import { useTilt } from '@/hooks/useTilt'
import { AUDIENCE_LABEL, type Course } from '@/data/courses'
import { PlusIcon } from '@/components/ui/icons'

export function CourseCard({ course }: { course: Course }) {
  const [open, setOpen] = useState(false)
  const tiltRef = useTilt<HTMLDivElement>(5)

  return (
    <div
      ref={tiltRef}
      data-course-card
      className="group relative flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7 transition-colors duration-300 hover:border-gold-400/40"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-3xl font-extrabold text-white/15">{course.index}</span>
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

      <h3 className="mt-5 font-display text-xl font-bold leading-snug text-white sm:text-2xl">{course.title}</h3>
      <p className="mt-3 font-sans text-sm leading-relaxed text-mist-300">{course.summary}</p>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-6 flex items-center gap-2 font-subtitle text-xs font-semibold uppercase tracking-[0.2em] text-gold-400"
      >
        <PlusIcon className={`size-3.5 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
        {open ? 'Ver menos' : 'O que você vai aprender'}
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.7,0,.2,1)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
            {course.topics.map((topic) => (
              <li key={topic} className="flex items-start gap-2.5 font-sans text-sm text-mist-300">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-gold-400" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span className="pointer-events-none absolute inset-x-7 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  )
}

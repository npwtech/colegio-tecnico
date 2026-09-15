import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
}

/**
 * Consistent section-intro block: small numbered/labelled eyebrow, a large
 * display heading, and an optional supporting line. Elements carry data
 * attributes that section-level GSAP timelines target for reveal.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  titleClassName = '',
}: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      <div data-heading-eyebrow className="mb-5 flex items-center gap-3 overflow-hidden" style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span className="h-px w-8 bg-gold-400" />
        <span className="font-subtitle text-xs font-semibold uppercase tracking-[0.32em] text-gold-400">{eyebrow}</span>
      </div>
      <h2
        data-heading-title
        className={`font-display text-4xl font-extrabold leading-[1.05] text-balance text-white sm:text-5xl lg:text-6xl ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p data-heading-description className="mt-6 max-w-xl font-sans text-base leading-relaxed text-mist-300 sm:text-lg" style={{ marginInline: align === 'center' ? 'auto' : undefined }}>
          {description}
        </p>
      )}
    </div>
  )
}

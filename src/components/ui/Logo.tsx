interface LogoProps {
  className?: string
  markSize?: number
  showTagline?: boolean
  tone?: 'light' | 'dark'
}

/**
 * Vector recreation of the SEFTI mark: a graduation cap + circuit-etched "S"
 * beside the EFTI wordmark. Built as scalable SVG/HTML (not a raster crop)
 * so it stays crisp at any size and can be animated piece by piece.
 */
export function Logo({ className = '', markSize = 40, showTagline = false, tone = 'light' }: LogoProps) {
  const wordColor = tone === 'light' ? 'text-white' : 'text-navy-900'

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
        data-logo-mark
      >
        <defs>
          <linearGradient id="sefti-s-gradient" x1="6" y1="6" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#c7ccd8" />
          </linearGradient>
        </defs>

        {/* circuit trace, bottom-left */}
        <g data-logo-circuit stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round" opacity="0.95">
          <path d="M4 30 H10 L13 27" fill="none" />
          <circle cx="4" cy="30" r="1.6" fill="#FFD100" stroke="none" />
          <circle cx="13" cy="27" r="1.2" fill="#FFD100" stroke="none" />
        </g>

        {/* the S, rendered as a real glyph so it always reads correctly */}
        <text
          x="50%"
          y="66%"
          textAnchor="middle"
          fontFamily="Montserrat, sans-serif"
          fontWeight="800"
          fontSize="27"
          fill="url(#sefti-s-gradient)"
        >
          S
        </text>

        {/* graduation cap, perched top-right of the S */}
        <g data-logo-cap transform="translate(21.5 3.5) rotate(-8)">
          <path d="M7 0L14 3.1L7 6.2L0 3.1L7 0Z" fill="#FFD100" />
          <path d="M3.4 4.6V7.4C3.4 8.5 5 9.3 7 9.3C9 9.3 10.6 8.5 10.6 7.4V4.6L7 6.2L3.4 4.6Z" fill="#0B2D63" stroke="#FFD100" strokeWidth="0.5" />
          <line x1="12.6" y1="3.1" x2="12.6" y2="7.6" stroke="#FFD100" strokeWidth="0.9" />
          <circle cx="12.6" cy="8.2" r="1" fill="#FFD100" />
        </g>
      </svg>

      <span className={`font-display font-extrabold leading-none tracking-tight ${wordColor}`}>
        <span className="block text-[1.35rem]">
          EFTI
        </span>
        {showTagline && (
          <span className="mt-0.5 block font-subtitle text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-mist-300">
            Cursos de Tecnologia e Inovação
          </span>
        )}
      </span>
    </div>
  )
}

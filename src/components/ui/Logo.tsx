interface LogoProps {
  className?: string
  markSize?: number
  showTagline?: boolean
}

/** SEFTI brand mark: graduation cap + circuit-etched "S" beside the EFTI
 * wordmark, with the "Cursos de Tecnologia e Inovação" tagline baked in. */
export function Logo({ className = '', markSize = 40, showTagline = false }: LogoProps) {
  return (
    <img
      src="/images/sefti_logo.png"
      alt="SEFTI — Cursos de Tecnologia e Inovação"
      className={`w-auto shrink-0 object-contain ${className}`}
      style={{ height: showTagline ? markSize * 1.9 : markSize }}
    />
  )
}

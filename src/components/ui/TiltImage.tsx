import { useTilt } from '@/hooks/useTilt'

interface TiltImageProps {
  src: string
  alt: string
  className?: string
}

/** A photo that tilts gently toward the cursor on hover and eases back to
 * rest on leave — desktop, fine-pointer only (see useTilt). */
export function TiltImage({ src, alt, className = '' }: TiltImageProps) {
  const tiltRef = useTilt<HTMLDivElement>(4)

  return (
    <div ref={tiltRef} className={`relative overflow-hidden bg-navy-800 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />
    </div>
  )
}

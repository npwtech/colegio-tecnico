import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useInView } from '@/hooks/useInView'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { ImagePlane } from './ImagePlane'

interface WebGLImageProps {
  src: string
  alt: string
  className?: string
}

/**
 * A photo rendered on a small on-demand WebGL canvas with a hover ripple +
 * grayscale-to-color reveal, in the spirit of noho.ink's image treatment.
 * Falls back to a plain <img> with a CSS grayscale hover for reduced-motion
 * or unsupported devices, and defers mounting its canvas until it's about to
 * scroll into view so a page full of photos doesn't spin up every GPU
 * context at once.
 */
export function WebGLImage({ src, alt, className = '' }: WebGLImageProps) {
  const [containerRef, inView] = useInView<HTMLDivElement>()
  const supported = useWebGLSupport()
  const reducedMotion = usePrefersReducedMotion()
  const useCanvas = supported && !reducedMotion

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-navy-800 ${className}`}
    >
      {useCanvas ? (
        inView && (
          <Canvas
            frameloop="demand"
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            className="!absolute inset-0"
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          >
            <Suspense fallback={null}>
              <ImagePlane src={src} />
            </Suspense>
          </Canvas>
        )
      ) : (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="size-full object-cover grayscale-[0.5] transition-[filter] duration-700 ease-out hover:grayscale-0"
        />
      )}
    </div>
  )
}

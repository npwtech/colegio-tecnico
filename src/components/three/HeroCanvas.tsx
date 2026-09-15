import { Suspense, useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { NetworkSphere } from './NetworkSphere'
import { FallbackGlow } from './FallbackGlow'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

interface HeroCanvasProps {
  scrollProgress: RefObject<number>
}

/** The hero's 3D stage: an abstract network sphere with gentle mouse/scroll
 * reactivity and a soft bloom pass. Falls back to a static glow for
 * unsupported devices or reduced-motion visitors. */
export function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  const pointer = useRef({ x: 0, y: 0 })
  const supported = useWebGLSupport()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [reducedMotion])

  if (!supported || reducedMotion) {
    return <FallbackGlow />
  }

  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.55} color="#8fa6d6" />
      <pointLight position={[3, 2, 4]} intensity={45} color="#ffd100" />
      <pointLight position={[-4, -2, -3]} intensity={30} color="#2a4d8f" />
      <Suspense fallback={null}>
        <NetworkSphere pointer={pointer} scrollProgress={scrollProgress} />
      </Suspense>
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.7} luminanceThreshold={0.18} luminanceSmoothing={0.4} mipmapBlur radius={0.6} />
      </EffectComposer>
    </Canvas>
  )
}

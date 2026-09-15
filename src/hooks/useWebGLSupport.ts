import { useLayoutEffect, useState } from 'react'

/** One-time, synchronous-ish check for WebGL availability, used to decide
 * between the real 3D scene and a lightweight CSS fallback. */
export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(true)

  useLayoutEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
      setSupported(Boolean(gl))
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}

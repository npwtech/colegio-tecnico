import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber'

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUvRaw;
  varying vec2 vUvCover;
  uniform float uImageAspect;
  uniform float uPlaneAspect;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform float uTime;

  void main() {
    vUvRaw = uv;
    vec2 ratio = vec2(
      min(uPlaneAspect / uImageAspect, 1.0),
      min(uImageAspect / uPlaneAspect, 1.0)
    );
    vUvCover = vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec3 pos = position;
    float dist = distance(uv, uMouse);
    float influence = smoothstep(0.5, 0.0, dist) * uHover;
    pos.z += influence * 0.28;
    pos.x += sin(uv.y * 8.0 + uTime * 1.4) * 0.014 * influence;
    pos.y += cos(uv.x * 8.0 + uTime * 1.4) * 0.014 * influence;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  varying vec2 vUvRaw;
  varying vec2 vUvCover;
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform vec2 uMouse;

  void main() {
    float dist = distance(vUvRaw, uMouse);
    float influence = smoothstep(0.5, 0.0, dist) * uHover;
    vec2 offset = (vUvRaw - uMouse) * influence * 0.025;

    float r = texture2D(uTexture, vUvCover + offset).r;
    float g = texture2D(uTexture, vUvCover).g;
    float b = texture2D(uTexture, vUvCover - offset).b;
    vec3 color = vec3(r, g, b);

    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    vec3 desaturated = mix(vec3(gray) * 0.82, color, 0.32);
    vec3 finalColor = mix(desaturated, color, uHover);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`

/** The actual WebGL plane behind a WebGLImage: a photo that idles desaturated
 * and reveals full color with a soft ripple + chromatic split under the
 * pointer, in the spirit of noho.ink's image hovers. */
export function ImagePlane({ src }: { src: string }) {
  const texture = useLoader(THREE.TextureLoader, src)
  const { viewport, invalidate } = useThree()
  const hoverTarget = useRef(0)
  const hoverCurrent = useRef(0)

  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
    invalidate()
  }, [texture, invalidate])

  const imageAspect = texture.image ? texture.image.width / texture.image.height : 1

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uImageAspect: { value: imageAspect },
      uPlaneAspect: { value: viewport.width / viewport.height },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
    }),
    // Deliberately keyed only on `texture`: uPlaneAspect/uHover are kept live via useFrame below.
    [texture],
  )

  useFrame((_state, delta) => {
    uniforms.uPlaneAspect.value = viewport.width / viewport.height
    uniforms.uTime.value += delta
    hoverCurrent.current += (hoverTarget.current - hoverCurrent.current) * Math.min(1, delta * 6)
    uniforms.uHover.value = hoverCurrent.current
    if (Math.abs(hoverTarget.current - hoverCurrent.current) > 0.001) invalidate()
  })

  return (
    <mesh
      onPointerMove={(event) => {
        if (event.uv) uniforms.uMouse.value.set(event.uv.x, event.uv.y)
        hoverTarget.current = 1
        invalidate()
      }}
      onPointerOut={() => {
        hoverTarget.current = 0
        invalidate()
      }}
    >
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <shaderMaterial args={[{ uniforms, vertexShader: VERTEX_SHADER, fragmentShader: FRAGMENT_SHADER }]} />
    </mesh>
  )
}

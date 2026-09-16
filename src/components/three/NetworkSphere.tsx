import { useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildNetworkGeometry } from './networkGeometry'

interface NetworkSphereProps {
  pointer: RefObject<{ x: number; y: number }>
  scrollProgress: RefObject<number>
}

export function NetworkSphere({ pointer, scrollProgress }: NetworkSphereProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  // Offset toward the right side of the frame, away from the headline text.
  const offsetX = useThree((state) => state.viewport.width * 0.16)

  const { nodePositions, edgePositions } = useMemo(() => buildNetworkGeometry(48, 1.75, 3), [])

  const nodesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    return geometry
  }, [nodePositions])

  const edgesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3))
    return geometry
  }, [edgePositions])

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    const group = groupRef.current
    if (group) {
      const scroll = scrollProgress.current ?? 0
      const targetRotY = pointer.current.x * 0.45 + state.clock.elapsedTime * 0.045 + scroll * Math.PI * 0.9
      const targetRotX = pointer.current.y * -0.28 + scroll * 0.35
      group.rotation.y += (targetRotY - group.rotation.y) * Math.min(1, delta * 2.2)
      group.rotation.x += (targetRotX - group.rotation.x) * Math.min(1, delta * 2.2)
      const targetScale = 1 - scroll * 0.16
      group.scale.setScalar(group.scale.x + (targetScale - group.scale.x) * Math.min(1, delta * 3))
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.12
      coreRef.current.rotation.x += delta * 0.06
    }
  })

  return (
    <group ref={groupRef} position={[offsetX, 0, 0]}>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#5b7fc4" transparent opacity={0.4} />
      </lineSegments>

      <points geometry={nodesGeometry}>
        <pointsMaterial color="#ffd100" size={0.06} sizeAttenuation transparent opacity={0.95} />
      </points>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color="#0b2d63"
          emissive="#12386f"
          emissiveIntensity={0.9}
          roughness={0.25}
          metalness={0.55}
          wireframe
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#ffe066" emissive="#ffd100" emissiveIntensity={1.4} roughness={0.4} />
      </mesh>
    </group>
  )
}

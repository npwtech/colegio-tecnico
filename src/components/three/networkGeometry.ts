import * as THREE from 'three'

export interface NetworkGeometry {
  nodePositions: Float32Array
  edgePositions: Float32Array
}

/**
 * Generates an abstract "knowledge network": nodes distributed evenly over
 * a sphere (Fibonacci lattice) and connected to their nearest neighbours —
 * evoking circuits, networks and connected systems rather than a literal
 * spinning-cube 3D cliché.
 */
export function buildNetworkGeometry(count = 48, radius = 1.7, neighborCount = 3): NetworkGeometry {
  const positions: THREE.Vector3[] = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    positions.push(new THREE.Vector3(x, y, z).multiplyScalar(radius))
  }

  const nodePositions = new Float32Array(count * 3)
  positions.forEach((p, i) => {
    nodePositions[i * 3] = p.x
    nodePositions[i * 3 + 1] = p.y
    nodePositions[i * 3 + 2] = p.z
  })

  const edgeKeys = new Set<string>()
  const edgeVerts: number[] = []

  positions.forEach((p, i) => {
    const nearest = positions
      .map((q, j) => ({ j, d: i === j ? Infinity : p.distanceTo(q) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, neighborCount)

    nearest.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (edgeKeys.has(key)) return
      edgeKeys.add(key)
      const q = positions[j]
      edgeVerts.push(p.x, p.y, p.z, q.x, q.y, q.z)
    })
  })

  return { nodePositions, edgePositions: new Float32Array(edgeVerts) }
}

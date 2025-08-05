// src/components/SolSoulCloud.jsx
import React, { useMemo } from 'react'
import * as THREE from 'three'

function generateVoxels(count = 350, radius = 1) {
  const voxels = []
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere coords
    const phi   = Math.acos(1 - 2 * (i + 0.5) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    // ±8% radial jitter
    const r     = radius * (1 + (Math.random() * 0.16 - 0.08))
    const pos   = new THREE.Vector3(
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi)
    )

    // size tier: 70% small, 25% med, 5% large
    const sizeRoll = Math.random()
    let scale = 0.02
    if (sizeRoll < 0.95 && sizeRoll >= 0.7) scale = 0.04
    else if (sizeRoll >= 0.95)            scale = 0.06

    // shape mix
    const roll = Math.random()
    let shape = 'cube'
    if (roll >= 0.8 && roll < 0.95) shape = 'sphere'
    else if (roll >= 0.95)         shape = 'capsule'

    voxels.push({ pos, shape, scale })
  }
  return voxels
}

export default function SolSoulCloud() {
  const voxels = useMemo(() => generateVoxels(350, 1), [])

  return (
    <group position={[0, 0, -3]}>
      {voxels.map(({ pos, shape, scale }, i) => (
        <mesh key={i} position={pos.toArray()} scale={[scale, scale, scale]}>
          {shape === 'cube'    && <boxGeometry    args={[1, 1, 1]} />}
          {shape === 'sphere'  && <sphereGeometry args={[1, 10, 10]} />}
          {shape === 'capsule' && <capsuleGeometry args={[1, 1, 4, 8]} />}

          <meshPhysicalMaterial
            color="#FFDFA0"
            metalness={0.2}
            roughness={0.5}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

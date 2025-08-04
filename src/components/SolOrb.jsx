import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Helper: Generate voxel positions on sphere shell
function generateVoxelPositions(count, radius) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    // Use spherical coordinates for even-ish distribution
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = radius;
    positions.push([
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi)
    ]);
  }
  return positions;
}

export default function SolOrb({ pulse }) {
  const group = useRef();
  const pulseStrength = useRef(0);

  // Create positions once
  const voxelPositions = useMemo(() => generateVoxelPositions(220, 1.25), []);

  // When the pulse prop changes, trigger a pulse
  useEffect(() => {
    pulseStrength.current = 1;
  }, [pulse]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Idle: gentle float/rotate
    if (group.current) {
      group.current.rotation.y = t * 0.11;
      group.current.position.y = Math.sin(t * 0.7) * 0.1;
    }

    // Decay the pulse over time
    if (pulseStrength.current > 0) {
      pulseStrength.current -= 0.12;
      if (pulseStrength.current < 0) pulseStrength.current = 0;
    }
  });

  return (
    <group ref={group}>
      {voxelPositions.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          scale={[
            0.025 + pulseStrength.current * 0.22, // Grow/shrink on pulse
            0.025 + pulseStrength.current * 0.22,
            0.025 + pulseStrength.current * 0.22
          ]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#ffc542"
            emissive="#ffc542"
            emissiveIntensity={1.1}
            roughness={0.23}
            transparent
            opacity={0.5 + 0.25 * pulseStrength.current}
          />
        </mesh>
      ))}
    </group>
  );
}

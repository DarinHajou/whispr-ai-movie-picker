import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

// Helper: Generate voxel positions on sphere shell
function generateVoxelData(count, radius) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = radius;
    const pos = [
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi)
    ];
    // The delay makes the pulse travel from bottom to top (adjust for different ripple style)
    const delay = 0.13 * (pos[1] / radius); // -0.13 to +0.13 seconds
    data.push({ pos, delay });
  }
  return data;
}

export default function SolOrb({ pulse }) {
  const group = useRef();
  const pulseTimer = useRef(-1); // -1 means idle

  // Create positions once
  const voxelData = useMemo(() => generateVoxelData(300, 1.13), []);

  // On pulse, start timer
  useEffect(() => {
  // Only start a new pulse if not already pulsing
  if (pulseTimer.current === -1) {
    pulseTimer.current = 0;
  }
}, [pulse]);

  useFrame((_, delta) => {
    // Idle: gentle float/rotate
    const time = performance.now() / 1000;
    if (group.current) {
      group.current.rotation.y = time * 0.17;
      group.current.position.y = Math.sin(time * 0.7) * 0.13;
    }
    // Advance timer
    if (pulseTimer.current >= 0) {
      pulseTimer.current += delta;
      if (pulseTimer.current > 0.38) pulseTimer.current = -1; // End pulse after duration
    }
  });

  return (
    <group ref={group}>
      {voxelData.map(({ pos, delay }, i) => {
        let scale = 0.012; // base cube size
        if (pulseTimer.current >= 0) {
          const pulseDuration = 0.48;
          const t = Math.min(Math.max((pulseTimer.current - delay), 0), pulseDuration) / pulseDuration;
          scale += Math.sin(Math.PI * t) * 0.10 * (t > 0 && t < 1 ? 1 : 0);
        }
        return (
          <mesh
            key={i}
            position={pos}
            scale={[scale, scale, scale]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#ffc542"
              emissive="#ffc542"
              emissiveIntensity={1.1}
              roughness={0.23}
              transparent
              opacity={0.50 + 0.25 * (pulseTimer.current >= 0 ? 1 : 0)}
            />
          </mesh>
        );
      })}
    </group>
  );
}

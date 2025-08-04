import { useMemo, useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import FresnelMaterial from './FresnelMaterial';

// Register the custom material so JSX recognizes it
extend({ FresnelMaterial });

// Generates positions/types for the cloud
function generateSoulCloud(count, radius) {
  const types = ["cube", "sphere", "capsule"];
  const data = [];
  for (let i = 0; i < count; i++) {
    const shape = types[Math.floor(Math.random() * (i % 6 === 0 ? 3 : 1))];
    const phi = Math.acos(-1 + (2 * i) / count) + (Math.random() - 0.5) * 0.14;
    const theta = Math.PI * (1 + Math.sqrt(5)) * i + (Math.random() - 0.5) * 0.1;
    const r = radius * (0.92 + Math.random() * 0.11);
    data.push({
      shape,
      pos: [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      ],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.12 + Math.random() * 0.07
    });
  }
  return data;
}

export default function SolSoulCloud({ pulse }) {
  const group = useRef();
  const pulseTimer = useRef(-1); // -1 means idle

  const soulData = useMemo(() => generateSoulCloud(260, 1.18), []);

  // Pulse logic: start timer when pulse prop changes
  useEffect(() => {
    if (pulseTimer.current === -1) {
      pulseTimer.current = 0;
    }
  }, [pulse]);

  // Animate the group as a whole, and increment pulse timer
  useFrame((_, delta) => {
    const t = performance.now() / 1000;
    if (group.current) {
      group.current.rotation.y = t * 0.14;
      group.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
    // Step pulse timer forward (if pulsing)
    if (pulseTimer.current >= 0) {
      pulseTimer.current += delta;
      if (pulseTimer.current > 0.48) pulseTimer.current = -1;
    }
  });

  return (
    <group ref={group}>
      {soulData.map((item, i) => {
        let geometry;
        if (item.shape === "cube") geometry = <boxGeometry args={[1, 1, 1]} />;
        if (item.shape === "sphere") geometry = <sphereGeometry args={[0.85, 10, 10]} />;
        if (item.shape === "capsule") geometry = <capsuleGeometry args={[0.48, 1.0, 4, 8]} />;

        // NEW: Use a ref to store mesh
        const meshRef = useRef();

        // Calculate per-voxel pulse (delayed by Y position for "wave")
        const delay = 0.13 * (item.pos[1] / 1.18); // -0.13 to +0.13 sec
        let pulseAmount = 0;
        if (pulseTimer.current >= 0) {
          const pulseDuration = 0.48;
          const t = Math.min(Math.max((pulseTimer.current - delay), 0), pulseDuration) / pulseDuration;
          pulseAmount = Math.sin(Math.PI * t) * (t > 0 && t < 1 ? 1 : 0);
        }

        // Animate this voxel in useFrame (breathing + pulse)
        useFrame(({ clock }) => {
          if (meshRef.current) {
            const t = clock.getElapsedTime();
            // Breath/wobble offset
            meshRef.current.position.x = item.pos[0] + Math.sin(t * 0.7 + i) * 0.03;
            meshRef.current.position.y = item.pos[1] + Math.sin(t * 0.5 + i * 1.7) * 0.03;
            meshRef.current.position.z = item.pos[2] + Math.sin(t * 0.9 - i) * 0.03;
            meshRef.current.rotation.x = item.rot[0] + Math.sin(t * 0.7 + i) * 0.11;
            meshRef.current.rotation.y = item.rot[1] + Math.cos(t * 0.6 - i) * 0.13;
          }
        });

        // Color morph: gold (idle) → cyan (on pulse) → gold
        const gold = new THREE.Color("#ffc542");
        const cyan = new THREE.Color("#41fff9");
        const currRim = gold.clone().lerp(cyan, pulseAmount);

        return (
          <mesh
            key={i}
            ref={meshRef}
            castShadow
            receiveShadow
            scale={[
              item.scale + pulseAmount * 0.08,
              item.scale + pulseAmount * 0.08,
              item.scale + pulseAmount * 0.08
            ]}
          >
            {geometry}
            <fresnelMaterial
              attach="material"
              baseColor="#fff7cf"
              rimColor={currRim}
              rimStrength={2.0 + pulseAmount * 1.0}
              gloss={0.15 + pulseAmount * 0.10}
              transparent
              opacity={0.77 + pulseAmount * 0.12}
            />
          </mesh>
        );
      })}
    </group>
  );
}

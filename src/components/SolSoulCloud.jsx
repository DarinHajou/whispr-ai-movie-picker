import { useMemo, useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import FresnelMaterial from './FresnelMaterial';

extend({ FresnelMaterial });

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
      scale: 0.04 + Math.random() * 0.05
    });
  }
  return data;
}

export default function SolSoulCloud({ pulse }) {
  const group = useRef();
  const pulseTimer = useRef(-1); // -1 means idle
  const pulseAmount = useRef(0);

  const soulData = useMemo(() => generateSoulCloud(370, 1.21), []);

  // Pulse logic: start timer when pulse prop changes
  useEffect(() => {
    if (pulseTimer.current === -1) {
      pulseTimer.current = 0;
    }
  }, [pulse]);

  useFrame((_, delta) => {
    const t = performance.now() / 1000;
    if (group.current) {
      group.current.rotation.y = t * 0.14;
      group.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
    // Animate pulse globally
    if (pulseTimer.current >= 0) {
      const pulseDuration = 0.48;
      let tt = pulseTimer.current / pulseDuration;
      if (tt > 1) tt = 1;
      pulseAmount.current = Math.sin(Math.PI * tt);
      pulseTimer.current += delta;
      if (pulseTimer.current > pulseDuration) {
        pulseTimer.current = -1;
        pulseAmount.current = 0;
      }
    }
  });

  return (
    <group ref={group}>
      {soulData.map((item, i) => {
        // Interpolate from "clustered" to "expanded"
        const base = item.pos.map(v => v * 0.65); // clustered state
        const currPos = base.map((v, idx) =>
          v + (item.pos[idx] - v) * pulseAmount.current
        );

        // Animate this voxel in useFrame (breathing)
        const meshRef = useRef();
        useFrame(({ clock }) => {
          if (meshRef.current) {
            const t = clock.getElapsedTime();
            // Breath/wobble offset
            meshRef.current.position.x = currPos[0] + Math.sin(t * 0.7 + i) * 0.03;
            meshRef.current.position.y = currPos[1] + Math.sin(t * 0.5 + i * 1.7) * 0.03;
            meshRef.current.position.z = currPos[2] + Math.sin(t * 0.9 - i) * 0.03;
            meshRef.current.rotation.x = item.rot[0] + Math.sin(t * 0.7 + i) * 0.11;
            meshRef.current.rotation.y = item.rot[1] + Math.cos(t * 0.6 - i) * 0.13;
          }
        });

        // Color morph: gold (idle) → cyan (on pulse) → gold
        const gold = new THREE.Color("#ffc542");
        const cyan = new THREE.Color("#41fff9");
        const currRim = gold.clone().lerp(cyan, pulseAmount.current);

        return (
          <mesh
            key={i}
            ref={meshRef}
            castShadow
            receiveShadow
            scale={[
              item.scale + pulseAmount.current * 0.08,
              item.scale + pulseAmount.current * 0.08,
              item.scale + pulseAmount.current * 0.08
            ]}
          >
            {item.shape === "cube" && <boxGeometry args={[1, 1, 1]} />}
            {item.shape === "sphere" && <sphereGeometry args={[0.85, 10, 10]} />}
            {item.shape === "capsule" && <capsuleGeometry args={[0.48, 1.0, 4, 8]} />}
            <fresnelMaterial
              attach="material"
              baseColor="#fff7cf"
              rimColor={currRim}
              rimStrength={2.0 + pulseAmount.current * 1.0}
              gloss={0.15 + pulseAmount.current * 0.10}
              transparent
              opacity={0.77 + pulseAmount.current * 0.12}
            />
          </mesh>
        );
      })}
    </group>
  );
}

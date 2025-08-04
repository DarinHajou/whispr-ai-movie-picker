import { useMemo, useRef } from "react";
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
  const soulData = useMemo(() => generateSoulCloud(260, 1.18), []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.14;
      group.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
  });

  return (
    <group ref={group}>
      { soulData.map((item, i) => {
    let geometry;
    if (item.shape === "cube") geometry = <boxGeometry args={[1, 1, 1]} />;
    if (item.shape === "sphere") geometry = <sphereGeometry args={[0.85, 10, 10]} />;
    if (item.shape === "capsule") geometry = <capsuleGeometry args={[0.48, 1.0, 4, 8]} />;

    // NEW: Use a ref to store mesh
    const meshRef = useRef();

    // Animate this voxel in useFrame
    useFrame(({ clock }) => {
      if (meshRef.current) {
        const t = clock.getElapsedTime();
        // Breath/wobble offset (feel free to tweak math for taste)
        meshRef.current.position.x = item.pos[0] + Math.sin(t * 0.7 + i) * 0.03;
        meshRef.current.position.y = item.pos[1] + Math.sin(t * 0.5 + i * 1.7) * 0.03;
        meshRef.current.position.z = item.pos[2] + Math.sin(t * 0.9 - i) * 0.03;
        // Optional: subtle rotation
        meshRef.current.rotation.x = item.rot[0] + Math.sin(t * 0.7 + i) * 0.11;
        meshRef.current.rotation.y = item.rot[1] + Math.cos(t * 0.6 - i) * 0.13;
      }
    });

    return (
      <mesh
        key={i}
        ref={meshRef}
        castShadow
        receiveShadow
        scale={[item.scale, item.scale, item.scale]}
      >
        {geometry}
        <fresnelMaterial
          attach="material"
          baseColor="#fff7cf"
          rimColor="#ffc542"
          rimStrength={2.0}
          gloss={0.15}
          transparent
          opacity={0.77}
        />
      </mesh>
        );
      })}
    </group>
  );
}

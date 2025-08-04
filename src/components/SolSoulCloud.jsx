// src/components/SoulCloud.jsx
import React, { useRef, useMemo } from "react";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { a, useSpring } from "@react-spring/three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise.js";

// Using built-in physical material, no custom shader needed

/**
 * Pre-generate static voxel data
 */
function generateVoxels(count = 370, radius = 1.21) {
  const types = ["cube", "sphere", "capsule"];
  return Array.from({ length: count }, (_, i) => {
    const shape = types[Math.random() < 0.35 ? 1 + Math.floor(Math.random() * 2) : 0];
    const phi = Math.acos(-1 + (2 * i) / count) + (Math.random() - 1.5) * 0.14;
    const theta = Math.PI * (1 + Math.sqrt(5)) * i + (Math.random() - 0.5) * 0.1;
    const r = radius * (0.62 + Math.random() * 0.31);
    const pos = new THREE.Vector3(
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi)
    );
    const rot = new THREE.Euler(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    const scale = 0.01 + Math.random() * 0.05;
    const noiseOffset = Math.random() * 1000;
    return { shape, pos, rot, scale, noiseOffset };
  });
}

/**
 * SoulCloud: 3D voxel orb that breathes with AI pulse
 */
export default function SoulCloud({ pulse }) {
  const groupRef = useRef();
  const voxels = useMemo(() => generateVoxels(370, 1.21), []);
  const noise = useMemo(() => new SimplexNoise(), []);

  // spring animated value 0→1
  const { spring } = useSpring({
    spring: pulse ? 1 : 0,
    config: { tension: 120, friction: 20 },
  });

  // gentle float
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.08;
    }
  });

  return (
    <a.group
      ref={groupRef}
      scale={spring.to(v => 1 + 0.3 * v)}
    >
      {voxels.map((v, i) => {
        if (!v.basePos) v.basePos = v.pos.clone().multiplyScalar(0.65);
        return (
          <a.mesh
            key={i}
            castShadow
            receiveShadow

            position={spring.to(vs => {
              const d = 0.65 + 0.5 * vs;
              const j = noise.noise3d(
                v.basePos.x + v.noiseOffset,
                v.basePos.y + v.noiseOffset,
                vs * 0.5
              ) * 0.03;
              return [v.pos.x * d + j, v.pos.y * d + j, v.pos.z * d + j];
            })}

            scale={spring.to(vs => {
              const j = noise.noise3d(
                v.basePos.x + v.noiseOffset,
                v.basePos.y + v.noiseOffset,
                vs * 0.5
              ) * 0.05;
              return v.scale * (1 + 0.5 * vs) * (1 + Math.abs(j));
            })}

            rotation={spring.to(vs => {
              const j = noise.noise3d(
                v.basePos.x + v.noiseOffset,
                v.basePos.y + v.noiseOffset,
                vs * 0.5
              ) * 0.05;
              return [v.rot.x + j, v.rot.y + j, v.rot.z + j];
            })}
          >
            {v.shape === "cube"    && <boxGeometry    args={[1,1,1]} />}
            {v.shape === "sphere"  && <sphereGeometry args={[0.85,10,10]} />}
            {v.shape === "capsule" && <capsuleGeometry args={[0.48,1.0,4,8]} />}

            {/* Use built-in physical material with emissive for rim glow */}
            <a.meshPhysicalMaterial
              attach="material"
              color="#fff7cf"
              metalness={0.1}
              roughness={0.3}
              envMapIntensity={1}
              clearcoat={1}
              clearcoatRoughness={0.2}
              transparent
              opacity={spring.to(vs => 0.6 + 0.4 * vs)}
              emissive={spring.to(vs =>
                new THREE.Color("#ffc542").lerp(
                  new THREE.Color("#41fff9"),
                  vs
                )
              )}
              emissiveIntensity={spring.to(vs => 1 + 2 * vs)}
            />
          </a.mesh>
        );
      })}
    </a.group>
  );
}
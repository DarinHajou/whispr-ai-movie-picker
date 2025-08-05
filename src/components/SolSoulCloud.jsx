// src/components/SolSoulCloud.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';

/** Generate 400 voxels with 80/15/5 shape mix and ±8% radial jitter */
function generateVoxels(count = 400, radius = 1.0) {
  const voxels = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count) + (Math.random() - 0.5) * 0.14;
    const theta = Math.PI * (1 + Math.sqrt(5)) * i + (Math.random() - 0.5) * 0.1;
    const r0 = radius * (0.92 + Math.random() * 0.16);           // ±8%
    const pos = new THREE.Vector3(
      r0 * Math.cos(theta) * Math.sin(phi),
      r0 * Math.sin(theta) * Math.sin(phi),
      r0 * Math.cos(phi)
    );

    const shapeRand = Math.random();
    let shape = 'cube';
    if (shapeRand < 0.15) shape = 'sphere';
    else if (shapeRand < 0.20) shape = 'capsule';

    const scale = 0.02 + Math.random() * 0.04;
    const spinAxis = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
    const spinSpeed = 0.2 + Math.random() * 0.8;

    voxels.push({ shape, pos, scale, spinAxis, spinSpeed });
  }
  return voxels;
}

export default function SolSoulCloud({ pulse }) {
  const groupRef = useRef();
  const voxels = useMemo(() => generateVoxels(400, 1.0), []);
  const meshRefs = useRef([]);
  const noise = useMemo(() => new SimplexNoise(), []);

  // cache original positions & scales
  useMemo(() => {
    voxels.forEach(v => {
      v.basePos = v.pos.clone();
      v.baseScale = v.scale;
    });
  }, [voxels]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // 1) Group drift + float
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.05;
    }

    // 2) Per-voxel breathing + silhouette warp
    voxels.forEach((v, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      // breathing on scale
      const breathNoise = noise.noise3d(
        v.basePos.x * 0.5,
        v.basePos.y * 0.5,
        t * 0.1
      ) * 0.05 + 1.0;
      const s = v.baseScale * breathNoise;
      mesh.scale.set(s, s, s);

      // dynamic radial jitter
      const jitter = noise.noise3d(
        v.basePos.x,
        v.basePos.y,
        t * 0.2
      ) * 0.08;
      const radius = v.basePos.length() * (1 + jitter);
      const dir = v.basePos.clone().normalize();
      mesh.position.copy(dir.multiplyScalar(radius));

      // maintain spin
      mesh.rotateOnAxis(v.spinAxis, v.spinSpeed * delta);
    });
  });

  return (
    <group ref={groupRef}>
      {voxels.map((v, i) => (
        <mesh
          key={i}
          ref={el => (meshRefs.current[i] = el)}
          castShadow
          receiveShadow
        >
          {v.shape === 'cube' && <boxGeometry args={[1, 1, 1]} />}
          {v.shape === 'sphere' && <sphereGeometry args={[0.85, 10, 10]} />}
          {v.shape === 'capsule' && <capsuleGeometry args={[0.48, 1.0, 4, 8]} />}
          <meshPhysicalMaterial
            color="#FFDFA0"
            metalness={0.05}
            roughness={0.5}
            clearcoat={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

// src/components/SolSoulCloud.jsx
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';

/** Generate 400 voxels with 80/15/5 shape mix, ±8% radial jitter, and a per-voxel delay */
function generateVoxels(count = 350, radius = 1.0) {
  const voxels = [];
  for (let i = 0; i < count; i++) {
    const phi   = Math.acos(-1 + (2 * i) / count) + (Math.random() - 0.5) * 0.14;
    const theta = Math.PI * (1 + Math.sqrt(5)) * i + (Math.random() - 0.5) * 0.1;
    const r0    = radius * (0.92 + Math.random() * 0.16);
    const pos   = new THREE.Vector3(
      r0 * Math.cos(theta) * Math.sin(phi),
      r0 * Math.sin(theta) * Math.sin(phi),
      r0 * Math.cos(phi)
    );

    const shapeRand = Math.random();
    let shape = 'cube';
    if (shapeRand < 0.15)      shape = 'sphere';
    else if (shapeRand < 0.20) shape = 'capsule';

    const scale     = 0.02 + Math.random() * 0.04;
    const spinAxis  = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
    const spinSpeed = 0.2 + Math.random() * 0.8;
    const delay     = Math.random() * 0.3;        // up to 0.3s ripple delay

    voxels.push({ shape, pos, scale, spinAxis, spinSpeed, delay });
  }
  return voxels;
}

export default function SolSoulCloud({ pulse }) {
  const groupRef      = useRef();
  const voxels        = useMemo(() => generateVoxels(), []);
  const meshRefs      = useRef([]);
  const noise         = useMemo(() => new SimplexNoise(), []);

  // timers
  const idleTimeRef   = useRef(0);
  const pulseTimeRef  = useRef(-1);

  // trigger pulse
  useEffect(() => {
    if (pulse) pulseTimeRef.current = 0;
  }, [pulse]);

  useFrame((_, delta) => {
    // advance idle clock
    idleTimeRef.current += delta;
    const tIdle     = idleTimeRef.current;
    const idleScale = Math.sin(tIdle * 0.5) * 0.02;

    console.log('pulseTime', pulseTimeRef.current.toFixed(2));

    // advance global pulse clock
    if (pulseTimeRef.current >= 0) {
      pulseTimeRef.current += delta;
      if (pulseTimeRef.current > 0.6) {
        pulseTimeRef.current = -1;
      }
    }
    const dur = 0.6;

    // update group (global breathe + pulse)
    if (groupRef.current) {
      // global pulse amplitude for visuals only; 
      // per-voxel ripple handled below in time domain
      const globalPulse = (pulseTimeRef.current >= 0)
        ? Math.sin(Math.PI * Math.min(pulseTimeRef.current / dur, 1))
        : 0;

      const gS = 1 + idleScale + 0.6 * globalPulse;
      groupRef.current.scale.set(gS, gS, gS);
      groupRef.current.rotation.y = tIdle * 0.08;
      groupRef.current.position.set(0, Math.sin(tIdle * 0.3) * 0.08, -2);
    }

    // update each voxel
    voxels.forEach((v, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      // --- new ripple logic: offset the *time* each voxel uses ---
      let localPulse = 0;
      if (pulseTimeRef.current >= 0) {
        const t0 = pulseTimeRef.current - v.delay;       // apply per-voxel delay in seconds
        if (t0 > 0) {
          const norm = Math.min(t0 / dur, 1);
          localPulse = Math.sin(Math.PI * norm);
        }
      }

      // distance from center
      const dist = 0.65 + idleScale + 0.3 * localPulse;

      // noise jitter
      const jb = noise.noise3d(v.pos.x + tIdle, v.pos.y + tIdle, tIdle * 0.3) * 0.02;

      mesh.position.set(
        v.pos.x * dist + jb,
        v.pos.y * dist + jb,
        v.pos.z * dist + jb
      );

      // scale breathing + ripple
      const s = v.scale * (1 + Math.abs(idleScale) + 0.3 * localPulse);
      mesh.scale.set(s, s, s);

      // spin
      mesh.rotateOnAxis(v.spinAxis, v.spinSpeed * delta);

      // material glow
      const mat = mesh.material;
      mat.emissive.set(localPulse > 0 ? 0x00ffff : 0xffdfa0);
      mat.emissiveIntensity = 1 + 2 * localPulse;
      mat.clearcoat = 1 + 0.5 * localPulse;
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
          {v.shape === 'cube'    && <boxGeometry    args={[1,1,1]} />}
          {v.shape === 'sphere'  && <sphereGeometry args={[0.85,10,10]} />}
          {v.shape === 'capsule' && <capsuleGeometry args={[0.28,1,4,8]} />}
          <meshPhysicalMaterial
            color="#FFDFA0"
            metalness={0.1}
            roughness={0.3}
            clearcoat={1}
            clearcoatRoughness={0.2}
            transparent
            opacity={0.8}
            emissive="#FFDFA0"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

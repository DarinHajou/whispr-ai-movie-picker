import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';

function generateVoxels(count = 300, radius = 1) {
  const voxels = [];
  for (let i = 0; i < count; i++) {
    const phi   = Math.acos(-1 + (2 * i) / count) + (Math.random() - 0.5) * 0.14;
    const theta = Math.PI * (1 + Math.sqrt(5)) * i + (Math.random() - 0.5) * 0.1;
    const r0    = radius * (0.62 + Math.random() * 0.66);
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
    const delay     = Math.random() * 0.45;
    voxels.push({ shape, pos, scale, spinAxis, spinSpeed, delay });
  }
  return voxels;
}

// === SHADER CHUNK ===
const vertexShader = `
  attribute float pulse;
  varying float vPulse;
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPulse = pulse;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
    varying float vPulse;
    varying vec3 vNormal;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform float rimStrength;

    void main() {
      float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0,0.0,1.0))), 1.6);
      rim *= rimStrength;
      vec3 base = mix(colorA, colorB, vPulse);
      vec3 final = base + rim * vec3(0.4, 1.0, 1.0);
      gl_FragColor = vec4(final, 0.85);
    }
`;

function createMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      colorA: { value: new THREE.Color('#FFDFA0') }, // Gold
      colorB: { value: new THREE.Color('#00ffff') }, // Cyan
      rimStrength: { value: 0.85 },
    },
    transparent: true,
    depthWrite: false,
  });
}

export default function SolSoulCloud({ pulse }) {
  const groupRef = useRef();
  const voxels = useMemo(() => generateVoxels(), []);
  const noise = useMemo(() => new SimplexNoise(), []);

  // Shapes
  const cubes = voxels.filter(v => v.shape === 'cube');
  const spheres = voxels.filter(v => v.shape === 'sphere');
  const capsules = voxels.filter(v => v.shape === 'capsule');

  // Instanced mesh refs
  const cubeRef = useRef();
  const sphereRef = useRef();
  const capsuleRef = useRef();

  // pulseAmount per voxel
  const cubePulse = useRef();
  const spherePulse = useRef();
  const capsulePulse = useRef();

  // timers
  const idleTimeRef = useRef(0);
  const pulseTimeRef = useRef(-1);

  useEffect(() => {
    if (pulse) pulseTimeRef.current = 0;
  }, [pulse]);

  // === MATERIALS (one per mesh, can share) ===
  const material = useMemo(() =>
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      colorA: { value: new THREE.Color('#FFC542') },
      colorB: { value: new THREE.Color('#41fff9') }, 
      rimStrength: { value: 0.3 },
    },
    transparent: true,
    depthWrite: false,
  }),
[]);


  // === PULSE BUFFERS ===
  useEffect(() => {
    // Init pulse attributes
    if (cubeRef.current) {
      cubeRef.current.geometry.setAttribute('pulse',
        new THREE.InstancedBufferAttribute(new Float32Array(cubes.length), 1)
      );
    }
    if (sphereRef.current) {
      sphereRef.current.geometry.setAttribute('pulse',
        new THREE.InstancedBufferAttribute(new Float32Array(spheres.length), 1)
      );
    }
    if (capsuleRef.current) {
      capsuleRef.current.geometry.setAttribute('pulse',
        new THREE.InstancedBufferAttribute(new Float32Array(capsules.length), 1)
      );
    }
  }, [cubes.length, spheres.length, capsules.length]);

  useFrame((_, delta) => {
    idleTimeRef.current += delta;
    const tIdle = idleTimeRef.current;
    const idleScale = Math.sin(tIdle * 0.5) * 0.10;

    // Pulse logic
    if (pulseTimeRef.current >= 0) {
      pulseTimeRef.current += delta;
      if (pulseTimeRef.current > 0.6) pulseTimeRef.current = -1;
    }
    const dur = 0.6;

    // Update group transform
    if (groupRef.current) {
      const globalPulse = pulseTimeRef.current >= 0
        ? Math.sin(Math.PI * Math.min(pulseTimeRef.current / dur, 1))
        : 0;
      const gS = 1 + idleScale + 1.2 * globalPulse;
      groupRef.current.scale.set(gS, gS, gS);
      groupRef.current.rotation.y = tIdle * 0.38;
      groupRef.current.position.set(0, Math.sin(tIdle * 3.6) * 0.08, -2);
    }

    // === UPDATE INSTANCES (position + pulse) ===

    // --- CUBES ---
    if (cubeRef.current) {
      const mat = new THREE.Matrix4();
      const quat = new THREE.Quaternion();
      const pulseAttr = cubeRef.current.geometry.getAttribute('pulse');
      cubes.forEach((v, i) => {
        let localPulse = 0;
        if (pulseTimeRef.current >= 0) {
          const t0 = pulseTimeRef.current - v.delay;
          if (t0 > 0) {
            const raw   = Math.min(t0 / dur, 1);
            const eased = raw * raw * (3 - 2 * raw);
            localPulse  = Math.sin(Math.PI * eased);
          }
        }
        const dist = 0.65 + idleScale + 0.3 * localPulse;
        const jb   = noise.noise3d(v.pos.x + tIdle, v.pos.y + tIdle, tIdle * 0.3) * 0.02;
        const pos = new THREE.Vector3(
          v.pos.x * dist + jb,
          v.pos.y * dist + jb,
          v.pos.z * dist + jb
        );
        const s = v.scale * (1 + Math.abs(idleScale) + 0.3 * localPulse);
        quat.setFromAxisAngle(v.spinAxis, v.spinSpeed * tIdle);
        mat.compose(pos, quat, new THREE.Vector3(s, s, s));
        cubeRef.current.setMatrixAt(i, mat);
        pulseAttr.setX(i, localPulse);
      });
      cubeRef.current.instanceMatrix.needsUpdate = true;
      pulseAttr.needsUpdate = true;
    }
    // --- SPHERES ---
    if (sphereRef.current) {
      const mat = new THREE.Matrix4();
      const quat = new THREE.Quaternion();
      const pulseAttr = sphereRef.current.geometry.getAttribute('pulse');
      spheres.forEach((v, i) => {
        let localPulse = 0;
        if (pulseTimeRef.current >= 0) {
          const t0 = pulseTimeRef.current - v.delay;
          if (t0 > 0) {
            const raw   = Math.min(t0 / dur, 1);
            const eased = raw * raw * (3 - 2 * raw);
            localPulse  = Math.sin(Math.PI * eased);
          }
        }
        const dist = 0.65 + idleScale + 0.3 * localPulse;
        const jb   = noise.noise3d(v.pos.x + tIdle, v.pos.y + tIdle, tIdle * 0.3) * 0.02;
        const pos = new THREE.Vector3(
          v.pos.x * dist + jb,
          v.pos.y * dist + jb,
          v.pos.z * dist + jb
        );
        const s = v.scale * (1 + Math.abs(idleScale) + 0.3 * localPulse);
        quat.setFromAxisAngle(v.spinAxis, v.spinSpeed * tIdle);
        mat.compose(pos, quat, new THREE.Vector3(s, s, s));
        sphereRef.current.setMatrixAt(i, mat);
        pulseAttr.setX(i, localPulse);
      });
      sphereRef.current.instanceMatrix.needsUpdate = true;
      pulseAttr.needsUpdate = true;
    }
    // --- CAPSULES ---
    if (capsuleRef.current) {
      const mat = new THREE.Matrix4();
      const quat = new THREE.Quaternion();
      const pulseAttr = capsuleRef.current.geometry.getAttribute('pulse');
      capsules.forEach((v, i) => {
        let localPulse = 0;
        if (pulseTimeRef.current >= 0) {
          const t0 = pulseTimeRef.current - v.delay;
          if (t0 > 0) {
            const raw   = Math.min(t0 / dur, 1);
            const eased = raw * raw * (3 - 2 * raw);
            localPulse  = Math.sin(Math.PI * eased);
          }
        }
        const dist = 0.65 + idleScale + 0.3 * localPulse;
        const jb   = noise.noise3d(v.pos.x + tIdle, v.pos.y + tIdle, tIdle * 0.3) * 0.02;
        const pos = new THREE.Vector3(
          v.pos.x * dist + jb,
          v.pos.y * dist + jb,
          v.pos.z * dist + jb
        );
        const s = v.scale * (1 + Math.abs(idleScale) + 0.3 * localPulse);
        quat.setFromAxisAngle(v.spinAxis, v.spinSpeed * tIdle);
        mat.compose(pos, quat, new THREE.Vector3(s, s, s));
        capsuleRef.current.setMatrixAt(i, mat);
        pulseAttr.setX(i, localPulse);
      });
      capsuleRef.current.instanceMatrix.needsUpdate = true;
      pulseAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={cubeRef}
        args={[null, null, cubes.length]}
        castShadow
        receiveShadow
        material={material}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
      <instancedMesh
        ref={sphereRef}
        args={[null, null, spheres.length]}
        castShadow
        receiveShadow
        material={material}
      >
        <sphereGeometry args={[0.85, 10, 10]} />
      </instancedMesh>
      <instancedMesh
        ref={capsuleRef}
        args={[null, null, capsules.length]}
        castShadow
        receiveShadow
        material={material}
      >
        <capsuleGeometry args={[0.28, 1, 4, 8]} />
      </instancedMesh>
    </group>
  );
}

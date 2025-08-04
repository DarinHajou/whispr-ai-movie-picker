// src/components/SolOrbCanvas.jsx
import SolSoulCloud from './SolSoulCloud';
import { Canvas } from "@react-three/fiber";

export default function SolOrbCanvas({ pulse }) {
  console.log("Canvas got pulse:", pulse);
  return (
   <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
  {/* Key light: main source, a bit warm */}
  <directionalLight
    position={[2, 4, 6]}
    intensity={1.3}
    color="#ffd08a"
    castShadow
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
  />
  {/* Fill light: soft, blue tint for depth */}
  <directionalLight
    position={[-3, -2, 2]}
    intensity={0.6}
    color="#a0d9ff"
  />
  {/* Rim light: sharp, cool edge highlight */}
  <directionalLight
    position={[0, 2, -4]}
    intensity={1.0}
    color="#41fff9"
  />
  {/* Ambient: very low just for shadow lift */}
  <ambientLight intensity={0.17} />
  {/* The orb */}
  <SolSoulCloud pulse={pulse} />
  {/* (Optional) EffectComposer ... */}
</Canvas>

  );
}

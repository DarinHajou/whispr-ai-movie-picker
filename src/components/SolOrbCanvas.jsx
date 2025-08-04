// src/components/SolOrbCanvas.jsx
import SolSoulCloud from './SolSoulCloud';
import { Canvas } from "@react-three/fiber";
import SolOrb from "./SolOrb";

export default function SolOrbCanvas({ pulse }) {
  console.log("Canvas got pulse:", pulse);
  return (
   <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[2, 2, 3]} intensity={1.6} />
      <SolSoulCloud pulse={pulse} />
   </Canvas>

  );
}

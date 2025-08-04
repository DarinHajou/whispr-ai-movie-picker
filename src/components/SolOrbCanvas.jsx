// src/components/SolOrbCanvas.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import SolOrb from "./SolOrb";

export default function SolOrbCanvas({ pulse }) {
  console.log("Canvas got pulse:", pulse);
  return (
    <Canvas
      gl={{ alpha: true }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      camera={{ position: [0, 0, 5], fov: 60 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} />
      <SolOrb pulse={pulse} />
    </Canvas>
  );
}

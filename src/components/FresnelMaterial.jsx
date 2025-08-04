// src/components/FresnelMaterial.jsx
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const FresnelMaterial = shaderMaterial(
  {
    baseColor: new THREE.Color("#fff7cf"),
    rimColor: new THREE.Color("#ffc542"),
    rimStrength: 2.0,
    gloss: 0.15,
  },
  `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vViewDir = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform vec3 baseColor;
    uniform vec3 rimColor;
    uniform float rimStrength;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float fresnel = pow(1.0 - dot(vNormal, vViewDir), rimStrength);
      vec3 color = mix(baseColor, rimColor, fresnel);
      gl_FragColor = vec4(color, 0.80);
    }
  `
);

export default FresnelMaterial;

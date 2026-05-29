"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const count = 1500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useEffect(() => {
    if (geoRef.current) {
      geoRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, [positions]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;

      const { x, y } = state.pointer;
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        x * 0.5,
        0.02
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        y * 0.3,
        0.02
      );
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        size={0.02}
        color="#d4a574"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <div className="hero-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleField />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}

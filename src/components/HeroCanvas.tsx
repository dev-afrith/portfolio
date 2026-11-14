"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function seededParticleValue(index: number, axis: number) {
  const x = Math.sin(index * 12.9898 + axis * 78.233) * 43758.5453;
  return (x - Math.floor(x) - 0.5) * 20;
}

function ParticleField({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = seededParticleValue(i, 0);
      pos[i * 3 + 1] = seededParticleValue(i, 1);
      pos[i * 3 + 2] = seededParticleValue(i, 2);
    }
    return pos;
  }, [count]);

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
  const reduceMotion = useReducedMotion();
  const isSmallViewport = typeof window !== "undefined" && window.innerWidth < 768;

  if (reduceMotion) {
    return null;
  }

  const particleCount = isSmallViewport ? 540 : 980;

  return (
    <div className="hero-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <ParticleField count={particleCount} />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}

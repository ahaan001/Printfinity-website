"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.z = t * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <mesh ref={meshRef} castShadow>
          <torusKnotGeometry args={[1.8, 0.5, 200, 32]} />
          <meshStandardMaterial
            color="#C0C8D8"
            metalness={0.7}
            roughness={0.2}
            envMapIntensity={1.5}
          />
        </mesh>
      </Center>
    </group>
  );
}

function SmallOrb({ position, speed }: { position: [number, number, number]; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t) * 0.5;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.z = t * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.25, 0]} />
      <meshStandardMaterial color="#3B82F6" metalness={0.8} roughness={0.1} transparent opacity={0.6} />
    </mesh>
  );
}

export default function HeroModel() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#3B82F6" />
        <directionalLight position={[0, -5, 2]} intensity={0.3} color="#C0C8D8" />
        <Environment preset="city" />
        <FloatingGeometry />
        <SmallOrb position={[-4, 1, -2]} speed={0.8} />
        <SmallOrb position={[4, -1, -3]} speed={0.6} />
        <SmallOrb position={[3, 2, -1]} speed={1.0} />
        <SmallOrb position={[-3, -2, -2]} speed={0.7} />
      </Canvas>
    </div>
  );
}

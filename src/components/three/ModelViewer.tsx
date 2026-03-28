"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import * as THREE from "three";
import { Box } from "lucide-react";

// Category → distinct procedural geometry
function CategoryPlaceholder({ category }: { category: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.4;
      ref.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;
    }
  });

  const mat = (
    <meshStandardMaterial color="#C0C8D8" metalness={0.65} roughness={0.25} />
  );

  const geo = () => {
    switch (category) {
      case "Home Decor":
        return <torusKnotGeometry args={[1.2, 0.35, 180, 24, 2, 3]} />;
      case "Figurine":
        return <icosahedronGeometry args={[1.5, 1]} />;
      case "Mechanical Part":
        return <torusGeometry args={[1.4, 0.4, 8, 48]} />;
      case "Art":
        return <octahedronGeometry args={[1.8, 1]} />;
      case "Gadget":
        return <boxGeometry args={[2, 2.5, 1.2]} />;
      default:
        return <sphereGeometry args={[1.5, 32, 32]} />;
    }
  };

  return (
    <group ref={groupRef}>
      <mesh ref={ref} castShadow>
        {geo()}
        {mat}
      </mesh>
    </group>
  );
}

function LoadingSpinner() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * 2;
    ref.current.rotation.y = state.clock.getElapsedTime();
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.1, 8, 40]} />
      <meshStandardMaterial color="#3B82F6" metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

interface ModelViewerProps {
  stlPath?: string;
  modelCategory?: string;
  autoRotate?: boolean;
  height?: string;
}

export default function ModelViewer({
  stlPath,
  modelCategory = "Default",
  autoRotate = true,
  height = "500px",
}: ModelViewerProps) {
  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden bg-[#0d1a2d]">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ antialias: true }}
        shadows
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#3B82F6" />
        <directionalLight position={[0, -3, 3]} intensity={0.3} color="#C0C8D8" />
        <Environment preset="studio" />

        <Center>
          <Suspense fallback={<LoadingSpinner />}>
            <ModelContent stlPath={stlPath} modelCategory={modelCategory} />
          </Suspense>
        </Center>

        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          enableZoom
          enablePan
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
    </div>
  );
}

function ModelContent({
  stlPath,
  modelCategory,
}: {
  stlPath?: string;
  modelCategory: string;
}) {
  const [fileExists, setFileExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!stlPath) {
      setFileExists(false);
      return;
    }
    fetch(stlPath, { method: "HEAD" })
      .then((res) => setFileExists(res.ok))
      .catch(() => setFileExists(false));
  }, [stlPath]);

  // While checking, show placeholder
  if (fileExists === null || !fileExists) {
    return <CategoryPlaceholder category={modelCategory} />;
  }

  // File confirmed to exist — load STL
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <STLModelLoader url={stlPath!} />
    </Suspense>
  );
}

// Dynamically imported only when actually needed
function STLModelLoader({ url }: { url: string }) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useLoader } = require("@react-three/fiber");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { STLLoader } = require("three/examples/jsm/loaders/STLLoader.js");
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (geometry && meshRef.current) {
      geometry.computeBoundingBox();
      geometry.center();
      const box = new THREE.Box3().setFromBufferAttribute(
        geometry.attributes.position as THREE.BufferAttribute
      );
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      meshRef.current.scale.setScalar(3 / maxDim);
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color="#C0C8D8" metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

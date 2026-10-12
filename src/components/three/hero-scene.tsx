"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

/** Tracks the pointer on the whole window (the canvas itself is pointer-events: none). */
function useWindowPointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useWindowPointer();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.current.x * 0.22,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.current.y * 0.14,
      3,
      delta,
    );
  });

  return <group ref={group}>{children}</group>;
}

function Blob({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const wire = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.25;
      wire.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.3}>
      <group position={position}>
        <mesh scale={scale}>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.28}
            roughness={0.18}
            metalness={0.65}
            distort={0.42}
            speed={2.1}
          />
        </mesh>
        <mesh ref={wire} scale={scale * 1.32}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.16}
          />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRings({
  position,
  color,
  radius = 1.9,
}: {
  position: [number, number, number];
  color: string;
  radius?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.22;
    ref.current.rotation.x += delta * 0.1;
  });

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.018, 12, 140]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[radius * 1.22, 0.012, 12, 140]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}

function Satellites({
  center,
  count = 7,
  radius = 2.6,
  color,
}: {
  center: [number, number, number];
  count?: number;
  radius?: number;
  color: string;
}) {
  const group = useRef<THREE.Group>(null);
  const offsets = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = i + 1;
        const angle = (i / count) * Math.PI * 2;
        const tilt = (Math.sin(seed * 12.12) - 0.5) * 0.8;
        const size = 0.06 + ((Math.sin(seed * 9.73) + 1) / 2) * 0.07;
        const speed = 0.35 + ((Math.cos(seed * 7.41) + 1) / 2) * 0.4;

        return { angle, tilt, size, speed };
      }),
    [count],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const o = offsets[i];
      const a = o.angle + t * o.speed;
      child.position.set(
        Math.cos(a) * radius,
        Math.sin(a * 1.3) * o.tilt,
        Math.sin(a) * radius,
      );
    });
  });

  return (
    <group ref={group} position={center}>
      {offsets.map((o, i) => (
        <mesh key={i}>
          <sphereGeometry args={[o.size, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Knot({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.26;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[0.9, 0.26, 220, 32]} />
        <meshPhysicalMaterial
          color="#c4b5fd"
          emissive="#7c3aed"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function FloatingShards() {
  const shards = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const seed = i + 1;

        return {
          position: [
            (Math.sin(seed * 1.9) - 0.5) * 14,
            (Math.cos(seed * 2.7) - 0.5) * 7,
            -2 - ((Math.sin(seed * 4.3) + 1) / 2) * 4,
          ] as [number, number, number],
          rotation: [
            ((Math.sin(seed * 3.1) + 1) / 2) * Math.PI,
            ((Math.cos(seed * 5.4) + 1) / 2) * Math.PI,
            0,
          ] as [number, number, number],
          scale: 0.12 + ((Math.sin(seed * 8.6) + 1) / 2) * 0.22,
          color: i % 2 === 0 ? "#67e8f9" : "#f0abfc",
          speed: 0.6 + ((Math.cos(seed * 1.7) + 1) / 2),
        };
      }),
    [],
  );

  return (
    <>
      {shards.map((s, i) => (
        <Float
          key={i}
          speed={s.speed}
          rotationIntensity={1.5}
          floatIntensity={1.6}
        >
          <mesh position={s.position} rotation={s.rotation} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.75}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function SceneContent() {
  const { viewport } = useThree();
  const spread = THREE.MathUtils.clamp(viewport.width * 0.33, 1.2, 4.4);
  const compact = viewport.width < 5;

  const blobPos: [number, number, number] = compact
    ? [-spread, 1.9, -1]
    : [-spread, 0.5, -1];
  const knotPos: [number, number, number] = compact
    ? [spread, -2, -1.5]
    : [spread, -0.4, -1.5];

  return (
    <ParallaxRig>
      <Blob position={blobPos} color="#22d3ee" scale={compact ? 0.7 : 1.1} />
      <OrbitRings
        position={blobPos}
        color="#67e8f9"
        radius={compact ? 1.2 : 1.9}
      />
      <Satellites
        center={blobPos}
        color="#a5f3fc"
        radius={compact ? 1.7 : 2.6}
      />
      <Knot position={knotPos} scale={compact ? 0.65 : 1} />
      <FloatingShards />
      <Sparkles
        count={220}
        scale={[18, 10, 8]}
        size={2.4}
        speed={0.35}
        opacity={0.7}
        color="#a5f3fc"
      />
      <Stars
        radius={70}
        depth={40}
        count={2200}
        factor={3}
        saturation={0}
        fade
        speed={0.6}
      />
    </ParallaxRig>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} />
      <pointLight position={[-6, 3, 4]} intensity={60} color="#22d3ee" />
      <pointLight position={[6, -3, 3]} intensity={60} color="#a78bfa" />
      <pointLight position={[0, 4, -4]} intensity={30} color="#f472b6" />
      <SceneContent />
    </Canvas>
  );
}

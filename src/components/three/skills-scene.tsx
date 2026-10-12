"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Sparkles, Text } from "@react-three/drei";
import * as THREE from "three";

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }
  return points;
}

function buildLinks(points: THREE.Vector3[], neighbours: number): Float32Array {
  const segments: number[] = [];
  points.forEach((p, i) => {
    const nearest = points
      .map((q, j) => ({ j, d: p.distanceTo(q) }))
      .filter((n) => n.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, neighbours);
    nearest.forEach((n) => {
      if (n.j > i) {
        const q = points[n.j];
        segments.push(p.x, p.y, p.z, q.x, q.y, q.z);
      }
    });
  });
  return new Float32Array(segments);
}

const PALETTE = ["#d9ff66", "#f2f1ea", "#aeb7a0", "#e6c879", "#b9d1bf"];

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

function Constellation({ words }: { words: string[] }) {
  const { viewport } = useThree();
  const radius = THREE.MathUtils.clamp(viewport.width * 0.28, 1.9, 3.1);

  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const pointer = useWindowPointer();

  const points = useMemo(
    () => fibonacciSphere(words.length, radius),
    [words.length, radius],
  );
  const linkPositions = useMemo(() => buildLinks(points, 2), [points]);
  const pointPositions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [points]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const g = group.current;
    g.rotation.y += delta * 0.14;
    const targetX = Math.sin(state.clock.elapsedTime * 0.25) * 0.18 - pointer.current.y * 0.25;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 2.5, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, pointer.current.x * 0.12, 2.5, delta);

    if (core.current) {
      core.current.rotation.x -= delta * 0.3;
      core.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[radius * 0.36, 1]} />
        <meshBasicMaterial color="#d9ff66" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 0.16, 32, 32]} />
        <meshStandardMaterial
          color="#d9ff66"
          emissive="#d9ff66"
          emissiveIntensity={1.7}
        />
      </mesh>

      {/* Outer shell */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#d9ff66"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Constellation links */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#bdcf83" transparent opacity={0.24} />
      </lineSegments>

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.95}
        />
      </points>

      {/* Billboarded WebGL labels avoid per-label DOM roots. */}
      {points.map((p, i) => (
        <Billboard key={words[i]} position={p}>
          <Text
            anchorX="center"
            anchorY="middle"
            color={PALETTE[i % PALETTE.length]}
            depthOffset={-1}
            fontSize={0.15}
            outlineColor="#05070d"
            outlineWidth={0.012}
          >
            {words[i]}
          </Text>
        </Billboard>
      ))}
    </group>
  );
}

export default function SkillsScene({ words }: { words: string[] }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 6]} intensity={34} color="#d9ff66" />
      <pointLight position={[-5, -3, 4]} intensity={22} color="#e6c879" />
      <Constellation words={words} />
      <Sparkles
        count={90}
        scale={[9, 7, 6]}
        size={1.8}
        speed={0.3}
        opacity={0.5}
        color="#d9ff66"
      />
    </Canvas>
  );
}

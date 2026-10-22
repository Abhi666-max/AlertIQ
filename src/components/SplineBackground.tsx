'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating Glass Orb ─────────────────────────────── */
function GlassOrb({
  position,
  scale,
  speed,
  color,
  distort,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  distort: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.3;
    meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.5;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.2;
  });

  return (
    <Float speed={speed * 0.6} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={speed * 0.8}
          transparent
          opacity={0.18}
          roughness={0.05}
          metalness={0.1}
          envMapIntensity={0.8}
        />
      </Sphere>
    </Float>
  );
}

/* ── Particle Field ──────────────────────────────────── */
function ParticleField() {
  const count = 280;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  const geoRef = useRef<THREE.BufferGeometry>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.05;
    const pos = geoRef.current.attributes.position;
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setY(i, y + Math.sin(t + x * 0.3) * 0.002);
    }
    pos.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a78bfa"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Grid Plane ──────────────────────────────────────── */
function GridPlane() {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame(({ clock }) => {
    gridRef.current.position.z = (clock.getElapsedTime() * 0.4) % 2;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[60, 40, '#4f46e5', '#1e1b4b']}
      position={[0, -6, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

/* ── Camera Drift ──────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();
  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.04;
    camera.position.z = 12 + Math.sin(t * 0.1) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Scene ───────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <CameraRig />
      <Stars radius={60} depth={50} count={800} factor={3} fade speed={0.4} />
      <ParticleField />
      <GridPlane />

      {/* Large violet orb — top center */}
      <GlassOrb position={[0, 3, -4]}   scale={3.5} speed={0.35} color="#7c3aed" distort={0.45} />
      {/* Blue orb — right */}
      <GlassOrb position={[7, -1, -5]}  scale={2.8} speed={0.28} color="#2563eb" distort={0.38} />
      {/* Cyan orb — left */}
      <GlassOrb position={[-6, 2, -3]}  scale={2.2} speed={0.42} color="#0891b2" distort={0.50} />
      {/* Small indigo — bottom */}
      <GlassOrb position={[3, -4, -2]}  scale={1.5} speed={0.55} color="#4f46e5" distort={0.55} />
      {/* Tiny violet accent */}
      <GlassOrb position={[-3, -3, -1]} scale={1.0} speed={0.65} color="#7c3aed" distort={0.60} />

      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]}   intensity={1.2} color="#7c3aed" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#2563eb" />
      <pointLight position={[0, 8, -2]}  intensity={0.5} color="#0891b2" />
    </>
  );
}

/* ── Export ──────────────────────────────────────────── */
export function SplineBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
      {/* Dark vignette overlay so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(2,4,8,0.25) 0%, rgba(2,4,8,0.75) 70%, rgba(2,4,8,0.92) 100%)',
        }}
      />
    </div>
  );
}

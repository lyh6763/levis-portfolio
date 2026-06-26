import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';

// SVG 폭발도(680×470)와 동일한 부품 좌표를 3D로 가져온다.
const S = 0.018;
const CX = 399;
const CY = 258;
const cx = (x: number) => (x - CX) * S;
const cy = (y: number) => -(y - CY) * S;

function extrude(points: number[][], depth = 0.2): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => {
    const X = (x - CX) * S;
    const Y = -(y - CY) * S;
    if (i === 0) shape.moveTo(X, Y);
    else shape.lineTo(X, Y);
  });
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

type Part = {
  geometry: THREE.BufferGeometry;
  color: string;
  roughness: number;
  metalness: number;
  base: [number, number, number];
  target: [number, number, number];
};

function useParts(): Part[] {
  return useMemo(() => {
    const denim = '#3a527f';
    const denim2 = '#34406f';
    const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w * S, h * S, d);

    const parts: Part[] = [
      {
        geometry: extrude([
          [322, 120], [312, 162], [300, 432], [372, 432], [399, 250], [426, 432], [498, 432], [486, 162], [478, 120],
        ]),
        color: denim, roughness: 0.85, metalness: 0, base: [0, 0, 0], target: [0, 0, -0.5],
      },
      {
        geometry: extrude([[334, 132], [386, 132], [386, 166], [360, 184], [334, 166]]),
        color: denim2, roughness: 0.85, metalness: 0, base: [0, 0, 0.05], target: [-1.4, -0.2, 0.6],
      },
      {
        geometry: extrude([[414, 132], [466, 132], [466, 166], [440, 184], [414, 166]]),
        color: denim2, roughness: 0.85, metalness: 0, base: [0, 0, 0.05], target: [1.4, -0.2, 0.6],
      },
      { geometry: box(160, 30, 0.22), color: denim2, roughness: 0.85, metalness: 0, base: [cx(400), cy(107), 0], target: [0, 1.0, 0.4] },
      { geometry: box(6, 17, 0.16), color: '#a8112e', roughness: 0.5, metalness: 0, base: [cx(413), cy(148.5), 0.12], target: [1.8, 0.3, 0.9] },
      { geometry: box(36, 24, 0.12), color: '#7a5630', roughness: 0.7, metalness: 0, base: [cx(458), cy(98), 0.12], target: [0.6, 1.4, 0.7] },
    ];

    const rivet = new THREE.SphereGeometry(0.06, 16, 16);
    ([[334, 132], [386, 132], [414, 132], [466, 132], [312, 160], [486, 160]] as number[][]).forEach(([x, y]) => {
      parts.push({
        geometry: rivet, color: '#b06a2c', roughness: 0.5, metalness: 0.5,
        base: [cx(x), cy(y), 0.12], target: [cx(x) * 0.5, cy(y) * 0.5, 1.0],
      });
    });

    return parts;
  }, []);
}

function Jean({ explodeRef }: { explodeRef: RefObject<number> }) {
  const parts = useParts();
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const e = explodeRef.current;
    parts.forEach((p, i) => {
      const m = meshes.current[i];
      if (!m) return;
      m.position.set(p.base[0] + p.target[0] * e, p.base[1] + p.target[1] * e, p.base[2] + p.target[2] * e);
    });
  });

  return (
    <group scale={0.46} rotation={[0.14, -0.32, 0]}>
      {parts.map((p, i) => (
        <mesh
          key={i}
          geometry={p.geometry}
          ref={(el) => {
            meshes.current[i] = el;
          }}
        >
          <meshStandardMaterial color={p.color} roughness={p.roughness} metalness={p.metalness} />
        </mesh>
      ))}
    </group>
  );
}

export default function JeanCanvas({
  explodeRef,
  onReady,
}: {
  explodeRef: RefObject<number>;
  onReady?: () => void;
}) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 10], fov: 32 }}
      gl={{ alpha: true, antialias: true }}
      onCreated={() => onReady?.()}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 6]} intensity={1.3} />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} />
      <Jean explodeRef={explodeRef} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

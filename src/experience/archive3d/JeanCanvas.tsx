import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';

// Keep the 3D parts aligned with the 680x470 SVG blueprint coordinates.
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
    if (i === 0) {
      shape.moveTo(X, Y);
    } else {
      shape.lineTo(X, Y);
    }
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
          [322, 120],
          [312, 162],
          [300, 432],
          [372, 432],
          [399, 250],
          [426, 432],
          [498, 432],
          [486, 162],
          [478, 120],
        ]),
        color: denim,
        roughness: 0.85,
        metalness: 0,
        base: [0, 0, 0],
        target: [0, 0, -0.5],
      },
      {
        geometry: extrude([
          [334, 132],
          [386, 132],
          [386, 166],
          [360, 184],
          [334, 166],
        ]),
        color: denim2,
        roughness: 0.85,
        metalness: 0,
        base: [0, 0, 0.05],
        target: [-1.4, -0.2, 0.6],
      },
      {
        geometry: extrude([
          [414, 132],
          [466, 132],
          [466, 166],
          [440, 184],
          [414, 166],
        ]),
        color: denim2,
        roughness: 0.85,
        metalness: 0,
        base: [0, 0, 0.05],
        target: [1.4, -0.2, 0.6],
      },
      {
        geometry: box(160, 30, 0.22),
        color: denim2,
        roughness: 0.85,
        metalness: 0,
        base: [cx(400), cy(107), 0],
        target: [0, 1.0, 0.4],
      },
      {
        geometry: box(6, 17, 0.16),
        color: '#a8112e',
        roughness: 0.5,
        metalness: 0,
        base: [cx(413), cy(148.5), 0.12],
        target: [1.8, 0.3, 0.9],
      },
      {
        geometry: box(36, 24, 0.12),
        color: '#7a5630',
        roughness: 0.7,
        metalness: 0,
        base: [cx(458), cy(98), 0.12],
        target: [0.6, 1.4, 0.7],
      },
    ];

    const rivet = new THREE.SphereGeometry(0.06, 16, 16);
    ([[334, 132], [386, 132], [414, 132], [466, 132], [312, 160], [486, 160]] as number[][]).forEach(
      ([x, y]) => {
        parts.push({
          geometry: rivet,
          color: '#b06a2c',
          roughness: 0.5,
          metalness: 0.5,
          base: [cx(x), cy(y), 0.12],
          target: [cx(x) * 0.5, cy(y) * 0.5, 1.0],
        });
      },
    );

    return parts;
  }, []);
}

function DragRig({ groupRef }: { groupRef: RefObject<THREE.Group | null> }) {
  const { gl } = useThree();
  const drag = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    rotationX: 0.14,
    rotationY: -0.32,
  });

  useEffect(() => {
    const element = gl.domElement;

    const handlePointerDown = (event: PointerEvent) => {
      drag.current.active = true;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      element.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!drag.current.active) {
        return;
      }

      const dx = event.clientX - drag.current.lastX;
      const dy = event.clientY - drag.current.lastY;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      drag.current.rotationY += dx * 0.006;
      drag.current.rotationX = THREE.MathUtils.clamp(drag.current.rotationX + dy * 0.004, -0.55, 0.65);
    };

    const handlePointerUp = (event: PointerEvent) => {
      drag.current.active = false;
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }
    };

    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerup', handlePointerUp);
    element.addEventListener('pointercancel', handlePointerUp);

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [gl]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, drag.current.rotationX, 0.08);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, drag.current.rotationY, 0.08);
  });

  return null;
}

function Jean({ explodeRef }: { explodeRef: RefObject<number> }) {
  const parts = useParts();
  const groupRef = useRef<THREE.Group | null>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const e = explodeRef.current;
    parts.forEach((p, i) => {
      const mesh = meshes.current[i];
      if (!mesh) {
        return;
      }
      mesh.position.set(p.base[0] + p.target[0] * e, p.base[1] + p.target[1] * e, p.base[2] + p.target[2] * e);
    });
  });

  return (
    <>
      <DragRig groupRef={groupRef} />
      <group ref={groupRef} scale={0.46} rotation={[0.14, -0.32, 0]}>
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
    </>
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
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 32 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 6]} intensity={1.3} />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} />
      <Jean explodeRef={explodeRef} />
    </Canvas>
  );
}

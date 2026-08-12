import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PETAL_COLORS = ["#5C6A2E", "#A8BE6E", "#5C6A2E", "#C9D89B"];
const PETAL_OFFSET = 0.6;
const SPIN_SPEED = 0.1;

function leafShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(0.45, 0.55, 1.0, 0);
  s.quadraticCurveTo(0.45, -0.55, 0, 0);
  return s;
}

const extrudeSettings: THREE.ExtrudeGeometryOptions = {
  depth: 0.18,
  bevelEnabled: true,
  bevelSegments: 4,
  bevelSize: 0.04,
  bevelThickness: 0.04,
  curveSegments: 32,
};

function Petal({
  angle,
  color,
  offset,
}: {
  angle: number;
  color: string;
  offset: number;
}) {
  const geom = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(leafShape(), extrudeSettings);
    g.center();
    return g;
  }, []);
  const x = Math.cos(angle) * offset;
  const y = Math.sin(angle) * offset;
  return (
    <mesh
      geometry={geom}
      position={[x, y, 0]}
      rotation={[0, 0, angle + Math.PI / 2]}
    >
      <meshStandardMaterial color={color} roughness={0.45} metalness={0.25} />
    </mesh>
  );
}

function Logo() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y =
      Math.sin(s.clock.elapsedTime * 0.4) * 0.5;
    group.current.rotation.x =
      Math.sin(s.clock.elapsedTime * 0.3) * 0.2;
    group.current.rotation.z = s.clock.elapsedTime * SPIN_SPEED;
  });

  const petals = [
    { angle: Math.PI * 0.25, color: PETAL_COLORS[0] },
    { angle: Math.PI * 0.75, color: PETAL_COLORS[1] },
    { angle: Math.PI * 1.25, color: PETAL_COLORS[2] },
    { angle: Math.PI * 1.75, color: PETAL_COLORS[3] },
  ];

  return (
    <group ref={group}>
      {petals.map((p, i) => (
        <Petal key={i} angle={p.angle} color={p.color} offset={PETAL_OFFSET} />
      ))}
    </group>
  );
}

export function IAPLogo3D({
  width = 200,
  height = 200,
  scale = 1,
}: {
  width?: number | string;
  height?: number | string;
  scale?: number;
}) {
  return (
    <div style={{ width, height }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        resize={{ scroll: false, offsetSize: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 6, 5]}
          intensity={1.2}
          color="#fff8e8"
        />
        <directionalLight
          position={[-5, -3, 2]}
          intensity={0.45}
          color="#A8BE6E"
        />
        <pointLight position={[0, 0, 4]} intensity={0.5} color="#F4F1E4" />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
          <group scale={scale}>
            <Logo />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}

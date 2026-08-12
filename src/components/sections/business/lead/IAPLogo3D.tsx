import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function LogoFromGLB({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, "/brand/iaplicada-logo-3d.glb");

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#B8CC4A"),
        emissive: new THREE.Color("#3a4210"),
        emissiveIntensity: 0.3,
        metalness: 0.6,
        roughness: 0.18,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 1,
        envMapIntensity: 1.5,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.35;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    group.current.rotation.z = Math.sin(t * 0.2) * 0.08;
  });

  const cloned = useMemo(() => {
    const c = gltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
      }
    });
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.position.sub(center);
    return c;
  }, [gltf.scene, material]);

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={group} scale={scale}>
        <primitive object={cloned} />
      </group>
    </Float>
  );
}

function FallbackLogo({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.35;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    group.current.rotation.z = Math.sin(t * 0.2) * 0.08;
  });

  const geom = useMemo(() => {
    const g = new THREE.DodecahedronGeometry(1.2, 1);
    return g;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.4}>
      <group ref={group} scale={scale}>
        <mesh geometry={geom}>
          <meshPhysicalMaterial
            color="#B8CC4A"
            emissive="#3a4210"
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.18}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={3.0} color="#fff8e8" />
      <directionalLight position={[-5, -4, 3]} intensity={1.5} color="#d5e95a" />
      <directionalLight position={[0, 5, -5]} intensity={1.2} color="#C9D89B" />
      <pointLight position={[0, 0, 6]} intensity={2.0} color="#F4F1E4" />
      <pointLight position={[-4, 3, -2]} intensity={1.0} color="#d5e95a" />
      <pointLight position={[4, -3, 2]} intensity={0.8} color="#fff" />
    </>
  );
}

function SceneWithModel({ scale }: { scale: number }) {
  const [glbFailed, setGlbFailed] = useState(false);

  if (glbFailed) {
    return (
      <>
        <SceneLights />
        <FallbackLogo scale={scale} />
      </>
    );
  }

  return (
    <>
      <SceneLights />
      <ErrorCatcher onError={() => setGlbFailed(true)}>
        <Suspense fallback={<FallbackLogo scale={scale} />}>
          <LogoFromGLB scale={scale} />
        </Suspense>
      </ErrorCatcher>
    </>
  );
}

function ErrorCatcher({
  children,
  onError,
}: {
  children: React.ReactNode;
  onError: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) onError();
  }, [hasError, onError]);

  if (hasError) return null;

  return (
    <ErrorBoundaryInner onCatch={() => setHasError(true)}>
      {children}
    </ErrorBoundaryInner>
  );
}

import { Component, type ErrorInfo, type ReactNode } from "react";

class ErrorBoundaryInner extends Component<
  { children: ReactNode; onCatch: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(_: Error, __: ErrorInfo) {
    this.props.onCatch();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
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
        camera={{ position: [0, 0, 6], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.8,
          powerPreference: "default",
        }}
        dpr={[1, 2]}
        style={{ background: "transparent", overflow: "visible" }}
        resize={{ scroll: false, offsetSize: true }}
      >
        <SceneWithModel scale={scale} />
      </Canvas>
    </div>
  );
}

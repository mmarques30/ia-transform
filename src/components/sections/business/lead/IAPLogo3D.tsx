import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const GLB_URL = "/brand/iaplicada-logo-3d.glb";

function LogoModel({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(GLB_URL);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#8B9B3A"),
        metalness: 0.72,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 1,
        envMapIntensity: 2.0,
      }),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.3;
    group.current.rotation.x = Math.sin(t * 0.35) * 0.12;
    group.current.rotation.z = Math.sin(t * 0.22) * 0.06;
  });

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
      }
    });
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.position.sub(center);
    return c;
  }, [scene, material]);

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={group} scale={scale}>
        <primitive object={cloned} />
      </group>
    </Float>
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
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        resize={{ scroll: false, offsetSize: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#fff8e8" />
        <directionalLight position={[-4, -3, 3]} intensity={0.6} color="#A8BE6E" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#F4F1E4" />
        <pointLight position={[-3, 2, -2]} intensity={0.35} color="#C9D89B" />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <LogoModel scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}

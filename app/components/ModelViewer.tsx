"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  Environment,
  ContactShadows,
  Html,
  useGLTF,
} from "@react-three/drei";

interface Props {
  model: string;
}

function Loader() {
  return (
    <Html center>
      <div className="rounded-xl bg-white px-5 py-3 shadow-lg">
        Cargando modelo...
      </div>
    </Html>
  );
}

function Modelo({ model }: Props) {
  const { scene } = useGLTF(model);

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, -0.4, 0]}
    />
  );
}

export default function ModelViewer({ model }: Props) {
  return (
    <div className="relative h-[650px] w-full overflow-hidden rounded-3xl border border-[#E8DDD2] bg-gradient-to-br from-[#FDFBF8] via-white to-[#F3ECE4] shadow-2xl">

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [4, 2, 6],
          fov: 40,
        }}
      >
        <Suspense fallback={<Loader />}>

          <Environment preset="city" />

          <ambientLight intensity={0.7} />

          <directionalLight
            intensity={2}
            position={[5, 8, 5]}
            castShadow
          />

          <Stage
            adjustCamera={false}
            environment={null}
            intensity={0.6}
            shadows="contact"
          >
            <Modelo model={model} />
          </Stage>

          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.35}
            scale={20}
            blur={2}
            far={5}
          />

          <OrbitControls
            makeDefault
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.8}
            zoomSpeed={0.9}
            minDistance={2}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.8}
          />

        </Suspense>

      </Canvas>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-5 py-2 text-sm text-white backdrop-blur-md">
        Arrastra para girar • Rueda para hacer zoom
      </div>

    </div>
  );
}
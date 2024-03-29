import { OrbitControls, Preload, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";

import CanvasLoader from "../Loader";

const Plane = () => {

  const { scene, animations } = useGLTF("./dae_stylized/plane.gltf");
  const { ref, names, actions } = useAnimations(animations)

  
  useEffect(() => {
    actions[names[0]].reset().fadeIn(1).play()
  })
  
  return (
    <mesh ref={ref}>
      <hemisphereLight intensity={-0.5} groundColor='white' />
      <spotLight
        position={[-20, 50, 25]}
      />
      <pointLight intensity={1} />
      <primitive
        object={scene}
        scale={21.90}
        position={[75.10, 9.5, -109.9]}
        rotation={[-5.98, 55.8, -5.8]}
      />
    </mesh>
  );
};

const PlaneCanvas = () => {

  return (
    <Canvas
      className="mouse-events"
      shadows
      frameloop='always'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: false }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Plane />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default PlaneCanvas;
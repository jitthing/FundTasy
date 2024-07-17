import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, useGLTF, Stage, Html } from "@react-three/drei";
import mypigs from "../../modelinfo";

function Model(props) {
  const { scene } = useGLTF(props.modelPath);
  return <primitive object={scene} {...props} />;
}

export default function ModelDisplay(props) {
  const show = props.show;
  const newWidth = show ? "calc(60vw - 400px)" : "100%";
  return (
    <div
      style={{ flex: "1", height: "50vh", width: newWidth, transition: "0.2s" }}
    >
      <Canvas
        dpr={[1, 2]}
        shadows={false}
        camera={{ fov: 45 }}
        resize={{ debounce: 0 }}
      >
        <PresentationControls speed={1.5} global>
          <Stage>
            <Suspense fallback={<Loading />} style={{ zIndex: "1" }}>
              <Model modelPath={props.modelUrl} scale={0.1} />
            </Suspense>
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

Object.keys(mypigs).map((modelname) =>
  useGLTF.preload(`models/${modelname}.glb`)
);

function Loading() {
  return (
    <Html>
      <div
        style={{
          position: "absolute",
          font: "700 20px Inter, sans-serif",
          zIndex: "0",
        }}
      >
        Loading...
      </div>
    </Html>
  );
}

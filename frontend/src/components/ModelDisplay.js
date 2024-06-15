import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, useGLTF, Stage, Html } from "@react-three/drei";
import mypigs from "../modelinfo";

function Model(props) {
    const { scene } = useGLTF(props.modelPath);
    return <primitive object={scene} {...props} />;
}

export default function ModelDisplay(props) {
    return (
        <div style={{ height: "50vh", width: "100%" }}>
        <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} >
            <PresentationControls speed={1.5} global>
            <Stage>
                <Suspense fallback={<Loading />}>
                <Model modelPath={props.modelUrl} scale={0.1} />
                </Suspense>
            </Stage>
            </PresentationControls>
        </Canvas>
        </div>
    );
}

Object.keys(mypigs).map((modelname) => (useGLTF.preload(`models/${modelname}.glb`)));

function Loading() {
    return (
        <Html>
            <div style={{ position:"relative", font: "700 20px Inter, sans-serif" }}>Loading...</div>
        </Html>
    );
}
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, useGLTF, Stage, Html } from "@react-three/drei";

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

useGLTF.preload("models/basic.glb");
useGLTF.preload("models/copper.glb");
useGLTF.preload("models/steel.glb");
useGLTF.preload("models/24k.glb");
useGLTF.preload("models/conjoined.glb");
useGLTF.preload("models/green.glb");
useGLTF.preload("models/panda.glb");
useGLTF.preload("models/coke.glb");
useGLTF.preload("models/fanta.glb");
useGLTF.preload("models/ninja.glb");
useGLTF.preload("models/santa.glb");
useGLTF.preload("models/chef.glb");
useGLTF.preload("models/evil.glb");
useGLTF.preload("models/angel.glb");
useGLTF.preload("models/cowboy.glb");

function Loading() {
    return (
        <Html>
        <div style={{ position:"relative", font: "700 20px Inter, sans-serif" }}>Loading...</div>
        </Html>
    );
}
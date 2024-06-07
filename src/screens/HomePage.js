import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, useGLTF, Stage, Html } from '@react-three/drei';
import styled from 'styled-components';
import Navbar from '../compoments/Navbar';
import Social from '../compoments/Social';

function Model(props) {
  const { scene } = useGLTF(props.modelPath);
  return <primitive object={scene} {...props} />;
}

function ModelDisplay(props) {
  return (
    <div style={{ height: '50vh', width: '50vw' }}>
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
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

function HomePage() {
  const [modelUrl, setModelUrl] = useState('models/basic.glb');

  const selectModel = (model) => {
    setModelUrl('models/' + model + '.glb');
  };

  return (
    <PageContainer>
      <Navbar />
      <Display>
        <ModelDisplay modelUrl={modelUrl} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SkinButton onClick={() => selectModel('basic')}>Basic</SkinButton>
          <SkinButton onClick={() => selectModel('copper')}>Copper</SkinButton>
          <SkinButton onClick={() => selectModel('steel')}>Steel</SkinButton>
          <SkinButton onClick={() => selectModel('24k')}>24K</SkinButton>
          <SkinButton onClick={() => selectModel('conjoined')}>Conjoined</SkinButton>
          <SkinButton onClick={() => selectModel('green')}>Green</SkinButton>
          <SkinButton onClick={() => selectModel('ninja')}>Ninja</SkinButton>
          <SkinButton onClick={() => selectModel('santa')}>Santa</SkinButton>
          <SkinButton onClick={() => selectModel('chef')}>Chef</SkinButton>
        </div>
      </Display>
      <Social />
    </PageContainer>
  );
}

useGLTF.preload('models/basic.glb');
useGLTF.preload('models/copper.glb');
useGLTF.preload('models/steel.glb');
useGLTF.preload('models/24k.glb');
useGLTF.preload('models/conjoined.glb');
useGLTF.preload('models/green.glb');
useGLTF.preload('models/ninja.glb');
useGLTF.preload('models/santa.glb');
useGLTF.preload('models/chef.glb');

function Loading() {
  return (
    <Html>
      <h2>Loading...</h2>
    </Html>
  );
}

const SkinButton = styled.button`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #cecece;
  border-radius: 20px;
  cursor: pointer;
  user-select: none;
  margin: 10px;
  :hover {
    background-color: yellow;
  }
`;

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

const Display = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 60vw;
`;

export default HomePage;

import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Social from "../components/Social";
import ModelDisplay from "../components/ModelDisplay";
import mypigs from "../modelinfo";

function HomePage() {
  const [modelUrl, setModelUrl] = useState("models/basic.glb");

  const selectModel = (model) => {
    setModelUrl("models/" + model + ".glb");
  };

  return (
    <PageContainer>
      <Navbar page="home" />
      <Display>
        <ModelDisplay modelUrl={modelUrl} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {Object.keys(mypigs).map((modelname) => (
            <SkinButton onClick={() => selectModel(modelname)}>{mypigs[modelname]}</SkinButton>
          ))}
        </div>
      </Display>
      <Social />
    </PageContainer>
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
  &:hover {
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
  width: 50vw;
`;

export default HomePage;

import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Social from "../components/Social";
import ModelDisplay from "../components/ModelDisplay";

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
          <SkinButton onClick={() => selectModel("basic")}>Basic</SkinButton>
          <SkinButton onClick={() => selectModel("copper")}>Copper</SkinButton>
          <SkinButton onClick={() => selectModel("steel")}>Steel</SkinButton>
          <SkinButton onClick={() => selectModel("24k")}>24K</SkinButton>
          <SkinButton onClick={() => selectModel("conjoined")}>Conjoined</SkinButton>
          <SkinButton onClick={() => selectModel("green")}>Green</SkinButton>
          <SkinButton onClick={() => selectModel("panda")}>Panda</SkinButton>
          <SkinButton onClick={() => selectModel("coke")}>Coke</SkinButton>
          <SkinButton onClick={() => selectModel("fanta")}>Fanta</SkinButton>
          <SkinButton onClick={() => selectModel("ninja")}>Ninja</SkinButton>
          <SkinButton onClick={() => selectModel("santa")}>Santa</SkinButton>
          <SkinButton onClick={() => selectModel("chef")}>Chef</SkinButton>
          <SkinButton onClick={() => selectModel("evil")}>Devil</SkinButton>
          <SkinButton onClick={() => selectModel("angel")}>Angel</SkinButton>
          <SkinButton onClick={() => selectModel("cowboy")}>Cowboy</SkinButton>
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

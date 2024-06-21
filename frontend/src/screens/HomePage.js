import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Social from "../components/Social";
import ModelDisplay from "../components/ModelDisplay";
import mypigs from "../modelinfo";
import SkinSection from "../components/SkinSection";
import GoalCard from "../components/HomePageComponents/GoalCard";
import TransactionCard from "../components/HomePageComponents/TransactionCard";

export default function HomePage() {
  const [modelUrl, setModelUrl] = useState("models/basic.glb");
  const [modelName, setModelName] = useState("Basic");
  const [show, setShow] = useState(false);

  const selectModel = (model) => {
    setModelUrl("models/" + model + ".glb");
    setModelName(mypigs[model]);
  };

  const getImagePath = (model) => {
    return "images/" + model + ".png";
  }

  const getModelName = () => {
    return modelName;
  }

  const toggleShow = () => {
    setShow(!show);
  }

  return (
    <PageContainer>
      <Navbar page="home" />
      <Display>
        <GoalCard />
        <PigDisplay>
          <ModelDisplay modelUrl={modelUrl} show={show} />
          <SkinSection getModelName={getModelName} getImagePath={getImagePath} mypigs={mypigs} selectModel={selectModel} show={show} toggle={toggleShow}/>
        </PigDisplay>
        <TransactionCard />
      </Display>
      <Social />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
`;

const Display = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60vw;
  height: 100vh;
  overflow-x: hidden;
  padding: 0px 10px;
`;

const PigDisplay = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 20px;
  max-width: 60vw;
`

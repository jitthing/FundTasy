import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Social from "../components/Social";
import ModelDisplay from "../components/ModelDisplay";
import mypigs from "../modelinfo";
import SkinSection from "../components/SkinSection";
import GoalCard from "../components/GoalCard";

function HomePage() {
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
        <TransactionCard>
          <TransactionHead>
            <div>Transactions</div>
            <a href="/transactions" style={{ fontWeight:"normal", color:"#645df2" }}>See all</a>
          </TransactionHead>
          <TransactionBody>
            <TransactionInfo>
              <div>Dinner with friends</div>
              <div style={{ color:"grey" }}>21:33</div>
            </TransactionInfo>
            <TransactionAmount>-$12.00</TransactionAmount>
          </TransactionBody>
          <TransactionBody>
            <TransactionInfo>
              <div>HEAP deposit</div>
              <div style={{ color:"grey" }}>29 Apr 2024</div>
            </TransactionInfo>
            <TransactionAmount>-$30.00</TransactionAmount>
          </TransactionBody>
        </TransactionCard>
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



const TransactionCard = styled.div`
  height: 22vh;
  width: 25vw;
  border-radius: 8px;
  box-shadow: 0px 0px 2px #bcbcbc;
  padding: 10px 20px;
`

const TransactionHead = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  max-height: 35px;
`

const TransactionBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 5px 0px;
  font-size: 14px;
`

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
`

const TransactionAmount = styled.div`
  font-size: 16px;
  text-align: right;
`

export default HomePage;

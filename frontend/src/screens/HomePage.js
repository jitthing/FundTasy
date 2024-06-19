import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Social from "../components/Social";
import ModelDisplay from "../components/ModelDisplay";
import mypigs from "../modelinfo";
import SkinSection from "../components/SkinSection";

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
        <GoalContainer>
          <GoalBox active />
          <GoalBox />
          <GoalBox />
        </GoalContainer>
        <PigDisplay>
          <ModelDisplay modelUrl={modelUrl} show={show} />
          <SkinSection getModelName={getModelName} getImagePath={getImagePath} mypigs={mypigs} selectModel={selectModel} show={show} toggle={toggleShow}/>
        </PigDisplay>
      </Display>
      <Social />
    </PageContainer>
  );
}

function GoalBox(props) {
  const isActive = props.active;
  if (isActive) {
    return (
      <ActiveGoal>
        <GoalInfo>
          <Goal>Goal: $150</Goal>
          <Saved>Saved: $78</Saved>
          <Rate>Income Rate: $40/day</Rate>
          <Duration>7 days (14/6/24 - 21/6/24)</Duration>
        </GoalInfo>
        <ProgressDiv>
          <ProgressBar percentage="52%" />
          4d
        </ProgressDiv>
      </ActiveGoal>
    )
  } else {
    return (
      <EmptyGoal>
        <AddIcon srcSet="icons/add.png" />
        Create New Goal
      </EmptyGoal>
    )
  }
}

function ProgressBar(props) {
  const percentage = props.percentage;
  return (
    <>
      <ProgressBase>
        <ProgressFill style={{ width:percentage }}/>
      </ProgressBase>
    </>
  )
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
  overflow: hidden;
  overflow-x: hidden;
`;

const PigDisplay = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 20px;
  max-width: 60vw;
`

const GoalContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 25vh;
  width: 100%;
`;

const EmptyGoal = styled.div`
  width: 30%;
  height: 22vh;
  background-color: #ececec;
  border-radius: 8px;
  font-weight: bold;
  color: #3b3b3b;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  &:hover {
    cursor: pointer;
    transition: 0.1s;
    filter:brightness(0.9);
  }
`

const AddIcon = styled.img`
  width: 40px;
  height: 40px;
  margin: 0px auto; 
  opacity: 0.5;
`

const ActiveGoal = styled.div`
  width: 30%;
  height: 22vh;
  background-color: white;
  border-radius: 8px;
  filter: drop-shadow(0px 0px 3px #cdcdcd);
`

const ProgressBase = styled.div`
  width: 85%;
  height: 8px;
  border-radius: 4px;
  background-color: #ececec;
`

const ProgressFill = styled.div`
  height: 8px;
  border-radius: 4px;
  background-color: #4bb543;
`

const Goal = styled.div`
  text-align:left;
  font-size: 20px;
  font-weight: bold;
`
const GoalInfo = styled.div`
  height: 80%;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Saved = styled.div`
  text-align:left;
  font-size: 20px;
  font-weight: bold;
`

const Rate = styled.div`
  text-align:left;
  font-size: 14px;
  font-weight: bold;
`

const Duration = styled.div`
  text-align:left;
  font-size: 14px;
`

const ProgressDiv = styled.div`
  width: 100%;
  height: 12px;
  padding: 4px 10px 0px;;
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`

export default HomePage;

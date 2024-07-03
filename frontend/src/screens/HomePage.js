import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Social from "../components/Social";
import ModelDisplay from "../components/ModelDisplay";
import mypigs from "../modelinfo";
import SkinSection from "../components/SkinSection";
import GoalCard from "../components/HomePageComponents/GoalCard";
import TransactionCard from "../components/HomePageComponents/TransactionCard";
import BarChartCard from "../components/HomePageComponents/BarChartCard";
import getActiveGoals from "../utils/getActiveGoals";
import updatePig from "../utils/updatePig";
import getUser from "../utils/getUser";
import ContributeForm from "../components/ContributeForm";

export default function HomePage() {
  const [modelUrl, setModelUrl] = useState("models/basic.glb");
  const [currentModel, updateModel] = useState("models/basic.glb");
  const [modelName, setModelName] = useState("Basic");
  const [show, setShow] = useState(false);
  const [activeGoals, setActiveGoals] = useState([]);
  const [updateGoals, setUpdateGoals] = useState(false);
  const [userId, setUserId] = useState("");
  const [saveTriggered, setSaveTriggered] = useState(false);
  const [contributeFormActive, showContributeForm] = useState(false);
  const [bankBalance, setBankBalance] = useState(0);
  const currentTime = new Date().toLocaleString();

  useEffect(() => {
    async function getUserId() {
      const userObj = await getUser();
      setUserId(userObj.user.username);
      setBankBalance(userObj.user.bankBalance);
      setModelUrl(`models/${userObj.user.displayPig}.glb`);
      updateModel(`models/${userObj.user.displayPig}.glb`);
    }
    getUserId();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try{
        const response = await getActiveGoals();
        // console.log(response.userGoals);
        setActiveGoals(response.userGoals);
      } catch (error) {
        console.log("Failed to fetch goals: " + error);
        alert("Failed to fetch goals: " + error);
      }
    }
    fetchData();
  }, [updateGoals]);

  const selectModel = (model) => {
    setModelUrl("models/" + model + ".glb");
    setModelName(mypigs[model]);
  };

  const getImagePath = (model) => {
    return "images/" + model + ".png";
  };

  const getModelName = () => {
    return modelName;
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const handleCancel = () => {
    setShow(!show);
    setModelUrl(currentModel);
  };

  useEffect(() => {
    async function handleSaveClick() {
      async function updatepig() {
        try{
          const response = await updatePig(userId, modelUrl, currentModel);
          console.log(response);
          updateModel(`models/${response.displayPig}.glb`);
        } catch (error) {
          console.log("Failed to update pig: " + error);
          alert("Failed to update pig: " + error);
        }
      }
      updatepig();
    }
    if (saveTriggered) {
      handleSaveClick();
      setSaveTriggered(false);
    }
  }, [saveTriggered, modelUrl, currentModel, userId]);

  const handleSave = () => {
    setShow(!show);
    setSaveTriggered(true);
  }

  const openContributeForm = () => {
    showContributeForm(true);
  }

  const closeContributeForm = () => {
    showContributeForm(false);
  }

  return (
    <PageContainer>
      {contributeFormActive && (<ContributeForm closeContributeForm={closeContributeForm} />)}
      <Navbar page="home" />
      <Display>
        <GoalCard goals={activeGoals} updateGoals={setUpdateGoals} />
        <PigDisplay>
          <ModelDisplay modelUrl={modelUrl} show={show} />
          <SkinSection
            getModelName={getModelName}
            getImagePath={getImagePath}
            mypigs={mypigs}
            selectModel={selectModel}
            show={show}
            toggle={toggleShow}
            cancel={handleCancel}
            save={handleSave}
          />
        </PigDisplay>
        <BottomDisplay>
          <TransactionCard />
          <BarChartCard />
        </BottomDisplay>
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
`;

const BottomDisplay = styled.div`
  height: 22vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: middle;
`;

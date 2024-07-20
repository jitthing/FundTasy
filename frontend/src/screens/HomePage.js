import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Toastify from "toastify-js";
import Navbar from "../components/Navbar";
import Social from "../components/HomePageComponents/Social";
import ModelDisplay from "../components/HomePageComponents/ModelDisplay";
import SkinSection from "../components/HomePageComponents/SkinSection";
import GoalCard from "../components/HomePageComponents/GoalCard";
import TransactionCard from "../components/HomePageComponents/TransactionCard";
import BarChartCard from "../components/HomePageComponents/BarChartCard";
import getActiveGoals from "../utils/getActiveGoals";
import updatePig from "../utils/updatePig";
import getUser from "../utils/getUser";
import ContributeForm from "../components/HomePageComponents/ContributeForm";
import PiggyBankCard from "../components/HomePageComponents/PiggyBankCard";
import getTransactions from "../utils/getTransactions";
import getAllOwnedPigs from "../utils/getOwnedPigs";
import IncomeModal from "../components/HomePageComponents/IncomeModal";

export default function HomePage() {
  const [modelUrl, setModelUrl] = useState("models/basic.glb");
  const [currentModel, updateModel] = useState("models/basic.glb");
  const [modelName, setModelName] = useState("Basic");
  const [show, setShow] = useState(false);
  const [activeGoals, setActiveGoals] = useState([]);
  const [updateGoals, setUpdateGoals] = useState(false);
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [saveTriggered, setSaveTriggered] = useState(false);
  const [contributeFormActive, showContributeForm] = useState(false);
  const [bankBalance, setBankBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [myPigs, setMyPigs] = useState([]);
  const currentTime = new Date().toLocaleString();
  const [userIncome, setUserIncome] = useState(0);
  const [showIncomeModal, setIncomeModal] = useState(userInfo.isFirstTime);
  const [earnedOn, setEarnedOn] = useState(currentTime);

  useEffect(() => {
    async function getUserId() {
      const userObj = await getUser();
      setUserInfo(userObj.user);
      setIncomeModal(userObj.user.isFirstTime);
      setUserId(userObj.user.username);
      setBankBalance(userObj.user.bankBalance);
      setModelUrl(`models/${userObj.user.displayPig}.glb`);
      updateModel(`models/${userObj.user.displayPig}.glb`);
      setModelName(
        userObj.user.displayPig.charAt(0).toUpperCase() +
          userObj.user.displayPig.slice(1)
      );
      setUserIncome(userObj.user.income);
    }
    getUserId();
  }, [updateGoals]);

  useEffect(() => {
    async function fetchData() {
      try {
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

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const transactionResponse = await getTransactions();
        const myPigsResponse = await getAllOwnedPigs();
        setMyPigs(myPigsResponse.want);
        setTransactions(transactionResponse.transactions.reverse().slice(0, 2));
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        alert("Failed to fetch transactions: " + error);
      }
    }
    fetchTransactions();
  }, []);

  const selectModel = (model) => {
    setModelUrl("models/" + model.toLowerCase() + ".glb");
    setModelName(model);
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
        try {
          const response = await updatePig(userId, modelUrl, currentModel);
          console.log(response);
          updateModel(`models/${response.displayPig}.glb`);
          Toastify({
            text: "Display pig updated!",
            duration: 2000,
            gravity: "top",
            position: "center",
            offset: {
              y: 10,
            },
            style: {
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#4bb543",
              color: "#fff",
              boxShadow: "0px 0px 4px #888888",
              width: "fit-content",
              height: "50px",
              position: "absolute",
              left: "calc(50vw - 50px)",
              borderRadius: "6px",
              padding: "10px 15px",
              textAlign: "center",
              zIndex: "100",
            },
          }).showToast();
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
  };

  const openContributeForm = () => {
    showContributeForm(true);
  };

  const closeContributeForm = () => {
    showContributeForm(false);
  };

  const closeIncomeModal = () => {
    setIncomeModal(false);
  };

  return (
    <PageContainer>
      {contributeFormActive && (
        <ContributeForm
          updateGoals={setUpdateGoals}
          closeContributeForm={closeContributeForm}
          activeGoals={activeGoals}
          bankBalance={bankBalance}
          updateBankBalance={setBankBalance}
        />
      )}
      {showIncomeModal && (
        <IncomeModal
          closeModal={closeIncomeModal}
          setUserIncome={setUserIncome}
          update={setUpdateGoals}
        />
      )}
      <Navbar page="home" />
      <Display>
        <GoalCard
          goals={activeGoals}
          updateGoals={setUpdateGoals}
          userIncome={userIncome}
        />
        <PigDisplay>
          <ModelDisplay modelUrl={modelUrl} show={show} />
          <SkinSection
            getModelName={getModelName}
            getImagePath={getImagePath}
            mypigs={myPigs}
            earnedOn={earnedOn}
            setEarnedOn={setEarnedOn}
            selectModel={selectModel}
            show={show}
            toggle={toggleShow}
            cancel={handleCancel}
            save={handleSave}
          />
        </PigDisplay>
        <BottomDisplay>
          <TransactionCard transactions={transactions} />
          <BarChartCard income={userIncome} />
        </BottomDisplay>
      </Display>
      <Div>
        <PiggyBankCard
          bankBalance={bankBalance}
          openContributeForm={openContributeForm}
          currentTime={currentTime}
          activeGoals={activeGoals}
          updateBankBalance={setBankBalance}
        />
        <Social userInfo={userInfo} />
      </Div>
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

const Div = styled.div`
  display: flex;
  align-content: flex-end;
  gap: 10px;
  max-width: 360px;
  width: 30vw;
  height: 100vh;
  flex-direction: column;
  font-size: 24px;
  color: #7b7b7b;
  font-family: Inter, sans-serif;
  margin: 0px;
  padding: 10px 5px 10px 0px;
  margin-left: auto;
  margin-right: 5px;
`;

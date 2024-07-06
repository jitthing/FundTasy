import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getUser from "../utils/getUser";
import axios from "axios";
import formatCurrency from "../utils/formatCurrency";

export default function ContributeForm({ closeContributeForm, activeGoals, bankBalance, updateBankBalance }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { amount, goal } = e.target.elements;
        const formData = {
            goalId: goal.value,
            amount: amount.value
        };
        console.log("trying");
        try {
            const response = await axios.post(
                "http://localhost:8000/update_bankbalance",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    }
                }
            )
            console.log(response);
        } catch (error) {
            console.error("Unable to allocate funds: " + error);
        }
        try {
            const response = await axios.post(
                "http://localhost:8000/update_saved_amount",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    }
                }
            )
            console.log(response);
        } catch (error) {
            console.error("Unable to allocate funds: " + error);
        }
        updateBankBalance(bankBalance - parseFloat(amount.value));
        closeContributeForm();
    }

    return (
        <ContributeBackdrop onClick={closeContributeForm}>
            <ContributeModal onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <Head>
                        <CloseIcon srcSet="icons/close.png" onClick={closeContributeForm} />
                        <Title>Allocate Funds</Title>
                    </Head>
                    <Body>
                        <FormBlock>
                            <FormLabel>Select Amount: <div style={{ display:"inline-block", fontWeight:"normal", fontSize:"12px" }}>(You may only allocate up to {formatCurrency(bankBalance)})</div></FormLabel>
                            <div
                                style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                gap: "10px",
                                }}
                            >
                                <div style={{ display: "inline-block", fontWeight: "bold" }}>$</div>
                                <TextInput
                                    type="number"
                                    required
                                    name="amount"
                                    min="0.01"
                                    max={20}
                                    step="0.01"
                                    placeholder="0.00"
                                />
                            </div>
                        </FormBlock>
                        <GoalBlock>
                            <FormLabel>Select Goal: </FormLabel>
                            {activeGoals.map((goal) => {
                                return (
                                    <GoalBox>
                                        <GoalRadio type="radio" name="goal" value={goal._id} />
                                        <GoalInfo>
                                        <GoalTitle>{goal.title} [{formatCurrency(goal.price)}] <GoalProgress>({getPercentage(goal.saved, goal.price)}% completed)</GoalProgress></GoalTitle>
                                            <ProgressBar percentage={getPercentage(goal.saved, goal.price)} />
                                        </GoalInfo>
                                    </GoalBox>
                                )
                            })}
                        </GoalBlock>
                    </Body>
                    <Bottom>
                        <Submit type="submit">Confirm Allocation</Submit>
                    </Bottom>
                </form>
            </ContributeModal>
        </ContributeBackdrop>
    )
}

function ProgressBar(props) {
    const percentage = props.percentage;
    const percent = ""+percentage+"%";
    return (
      <>
        <ProgressBase>
          <ProgressFill style={{ width: percent }} />
        </ProgressBase>
      </>
    );
  }

function getPercentage(saved, total) {
    return parseFloat(saved)/parseFloat(total) * 100.0;
}

const ContributeBackdrop = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 20vw;
  width: 80vw;
  min-height: 100vh;
  max-height: 100%;
  background-color: #00000080;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContributeModal = styled.div`
  width: 60%;
  height: 90%;
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
`;

const CloseIcon = styled.img`
  height: 16px;
  width: 16px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.85);
  }
`;

const Head = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  width: calc(100% - 20px);
  font-size: 20px;
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0px;
`;

const FormBlock = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10x;
`;

const FormLabel = styled.div`
  text-align: left;
  font-weight: bold;
  font-size: 16px;
`;

const TextInput = styled.input`
  width: 90%;
  height: 40px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ececec;
  &:focus {
    background-color: #fff;
    outline: 1px solid #cecece;
  }
`;

const GoalBlock = styled.div`
    width: 100%;    
    max-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 10x;
`

const GoalBox = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 5x;
`

const GoalRadio = styled.input`
    width: 20px;
    height: 20px;
`

const GoalInfo = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px;
`

const GoalTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: left;
`

const GoalProgress = styled.div`
    display: inline-block;
    font-size: 14px;
    color: grey;
`

const ProgressBase = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 6px;
  background-color: #ececec;
`;

const ProgressFill = styled.div`
  height: 12px;
  border-radius: 6px;
  background-color: #4bb543;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const Submit = styled.button`
  width: 170px;
  height: 40px;
  background-color: #645df2;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
`;
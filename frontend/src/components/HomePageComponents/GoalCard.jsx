import * as React from "react";
import styled from "styled-components";

export default function GoalCard() {
    return (
        <GoalContainer>
          <GoalHead>Goals</GoalHead>
          <GoalBody>
            <GoalBox active danger toSave="150" numDays="7" startDate="17/6/24" endDate="23/6/24" currentSaved="78" rate="40" lastTopUpAmt="9" lastTopUpDate="19/6/24" daysLeft="1" />
            <GoalBox active toSave="280" numDays="12" startDate="20/6/24" endDate="1/7/24" currentSaved="23" rate="40" lastTopUpAmt="14" lastTopUpDate="20/6/24" daysLeft="10" />
            <GoalBox />
          </GoalBody>
        </GoalContainer>
    )
}



function GoalBox(props) {
    const isActive = props.active;
    const danger = props.danger;
    const toSave = props.toSave;
    const numDays = props.numDays;
    const startDate = props.startDate;
    const endDate = props.endDate;
    const currentSaved = props.currentSaved;
    const rate = props.rate;
    const lastTopUpAmt = props.lastTopUpAmt;
    const lastTopUpDate = props.lastTopUpDate;
    const daysLeft = props.daysLeft;
    const percentage = (parseInt(currentSaved)/parseInt(toSave) * 100)+"%";

    if (isActive) {
      return (
        <ActiveGoal>
          <GoalInfo>
            <Goal>
                <div style={{ display:"inline-block", fontWeight:"bold" }}>Save ${toSave} in {numDays} days </div>
                <div style={{ display:"inline-block", fontSize:"12px", color:"grey" }}> ({startDate} - {endDate})</div>
            </Goal>
            <Saved>${currentSaved} <div style={{ display:"inline-block", fontSize:"14px", fontWeight:"normal" }}>saved</div></Saved>
            <Details>
                <LastAdded>+${lastTopUpAmt} on {lastTopUpDate}</LastAdded>
                <Rate>${rate}/day</Rate>
            </Details>
          </GoalInfo>
          <ProgressDiv>
            <ProgressBar percentage={percentage} />
            <TimeLeft danger={danger} >{daysLeft}d</TimeLeft>
          </ProgressDiv>
        </ActiveGoal>
      )
    } else {
      return (
        <EmptyGoal>
          <AddIcon srcSet="icons/add-white.png" />
          Add New Goal
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

const GoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 25vh;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 0px 2px #acacac;
  padding: 5px 20px;
`;

const GoalHead = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px 0px;
  max-height: 35px;
  text-align: left;
  width: 100%;
`

const GoalBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:80%;
    width: 100%;
`

const EmptyGoal = styled.div`
  width: 30%;
  height: 90%;
  background-color: #ececec;
  border-radius: 8px;
  font-weight: bold;
  color: #7b7b7b;
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
  width: 30px;
  height: 30px;
  margin: 0px auto; 
  filter: brightness(0.7);
  ${EmptyGoal}:hover & {
    filter: brightness(0.6);
    transition: 0.1s;
  }
`

const ActiveGoal = styled.div`
  width: 30%;
  height: 100%;
  background-color: #fff;
`

const Goal = styled.div`
  text-align:left;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const GoalInfo = styled.div`
  height: 80%;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Saved = styled.div`
  text-align:left;
  font-size: 28px;
  font-weight: bold;
  margin-top: 5px;
`

const Details = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: grey;
    height: 20%;
    width: 100%;
`

const Rate = styled.div`
  text-align: right;
  color: #000;
`

const LastAdded = styled.div`
  text-align:left;
`

const ProgressDiv = styled.div`
  width: 100%;
  height: 10%;
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`

const ProgressBase = styled.div`
  width: 80%;
  height: 8px;
  border-radius: 4px;
  background-color: #ececec;
`

const ProgressFill = styled.div`
  height: 8px;
  border-radius: 4px;
  background-color: #4bb543;
`

const TimeLeft = styled.div`
    height: 16px;
    width: 15%;
    border-radius: 8px;
    background-color: ${(props) => props.danger ? "#ffbaba":"#a5cda5"};
    color: ${(props) => props.danger ? "#c23434":"#138513"};
    font-weight: bold;
    font-size: 12px;
`
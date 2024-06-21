import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

export default function Transactions() {
    const [type, changeType] = useState("spending");
    
    const toggleType = (type) => {
        if (type === "spending") {
            changeType("coins");
        } else {
            changeType("spending");
        }
    }

    return (
        <PageContainer>
            <Navbar page="transactions" />
            <TransactionContainer>
                <TransactionHead>
                    <Title>My Transactions</Title>
                    <NewRecordButton>
                        <AddIcon srcSet="icons/add-white.png" />
                        <NewRecordText>New Record</NewRecordText>
                    </NewRecordButton>
                </TransactionHead>
                <TransactionNeck>
                    <ToggleBar>
                        <ToggleButton onClick={() => toggleType("spending")} active={type === "coins"} >Spending</ToggleButton>
                        <ToggleButton onClick={() => toggleType("coins")} active={type === "spending"} >Oink Coins</ToggleButton>
                    </ToggleBar>
                    <FilterButton>
                        <FilterIcon srcSet="icons/filter.png" />
                        <FilterText>Filter</FilterText>
                    </FilterButton>
                </TransactionNeck>
                
                <TransactionBody></TransactionBody>
            </TransactionContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

const TransactionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    height: 100%;
    padding: 0px 20px;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  width: calc(80vw - 280px);
`

const TransactionHead = styled.div`
  display: flex;
  height: 10vh;
  align-items: center;
`

const NewRecordButton = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;
    height: 40px;
    width: 150px;
    background-color: #645df2;
    color: #fff;
    cursor:pointer;
    &:hover{
        filter:brightness(0.9);
    }
`

const NewRecordText = styled.div`
    font-weight: bold;
    font-size: 16px;
`

const AddIcon = styled.img`
  width: 20px;
  height: 20px; 
`
const TransactionNeck = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 20%;
    margin-top: 20px;
`

const ToggleBar = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #ececec;
    width: 200px;
    height: 36px;
    border-radius: 8px;
    color: #adadad;
`

const ToggleButton = styled.div`
    height: 80%;
    width: 47%;
    font-weight: bold;
    font-size: 14px;
    border-radius: 6px;
    padding: 4px;
    cursor: pointer;
    color: ${(props) => props.active ? "#000":"#adadad"};
    background-color: ${(props) => props.active ? "#fff":"#ececec"};
    box-shadow: ${(props) => props.active ? "0px 0px 4px #cdcdcd":"none"};
    transition: 0.1s;
`

const FilterButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 36px;
    border-radius: 8px;
    box-shadow: 0px 0px 3px #adadad;
    padding: 0px 5px;
    cursor: pointer;
    &:hover {
        background-color: #f2f2f2;
        transition: 0.1s;
    }
`

const FilterIcon = styled.img`
    height: 14px;
    width: 14px;
`

const FilterText = styled.div`
    font-size: 14px;
    width: 60%;
    text-align: right;
`

const TransactionBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 90vh;
    overflow: scroll;
    overflow-x:hidden;
`
const TransactionDiv = styled.div`

`

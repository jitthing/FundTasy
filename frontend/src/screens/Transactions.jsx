import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import NewRecordForm from "../components/NewRecordForm";

export default function Transactions() {
    const [type, changeType] = useState("spending");
    const [formActive, showForm] = useState(false);
    
    const toggleType = (type) => {
        if (type === "spending") {
            changeType("coins");
        } else {
            changeType("spending");
        }
    }

    function openForm() {
        showForm(true);
    }

    function closeForm() {
        showForm(false);
    }

    return (
        <PageContainer>
            <Navbar page="transactions" />
            {formActive && (<NewRecordForm closeForm={closeForm}/>)}
            <TransactionContainer>
                <TransactionHead>
                    <Title>My Transactions</Title>
                    <NewRecordButton onClick={openForm}>
                        <AddIcon srcSet="icons/add-white.png" />
                        <NewRecordText>New Record</NewRecordText>
                    </NewRecordButton>
                </TransactionHead>
                <TransactionNeck>
                    <ToggleBar>
                        <ToggleButton onClick={() => toggleType("coins")} active={type === "spending"} >Spending</ToggleButton>
                        <ToggleButton onClick={() => toggleType("spending")} active={type === "coins"} >Oink Coins</ToggleButton>
                    </ToggleBar>
                    <FilterButton>
                        <FilterIcon srcSet="icons/filter.png" />
                        <FilterText>Filter</FilterText>
                    </FilterButton>
                </TransactionNeck>
                
                {type === "spending" && (<SpendingTable />)}
                {type === "coins" && (<CoinsTable />)}
            </TransactionContainer>
        </PageContainer>
    )
}

const SpendingTable = () => {
    return (
        <>
            <TransactionBody>
                    <TableHead>
                        <HeadTitle>Title</HeadTitle>
                        <HeadCategory>Category</HeadCategory>
                        <HeadGoal>Goal</HeadGoal>
                        <HeadDateTime>Date</HeadDateTime>
                        <HeadAmount>Amount</HeadAmount>
                    </TableHead>
                    <TransactionDiv>
                        <TransactionTitle>Dinner with friends</TransactionTitle>
                        <TransactionCategory>
                            <CategoryButton>Food</CategoryButton>
                        </TransactionCategory>
                        <TransactionGoal>
                            <GoalName>Save $150 in 7 days</GoalName>
                            <GoalStatus>In Progress</GoalStatus>
                        </TransactionGoal>
                        <TransactionDateTime>21:33</TransactionDateTime>
                        <TransactionAmount>-$12.00</TransactionAmount>
                    </TransactionDiv>
                    <TransactionDiv>
                        <TransactionTitle>HEAP deposit</TransactionTitle>
                        <TransactionCategory>
                            <CategoryButton>School</CategoryButton>
                        </TransactionCategory>
                        <TransactionGoal>
                            <GoalName>Save $280 in 12 days</GoalName>
                            <GoalStatus>In Progress</GoalStatus>
                        </TransactionGoal>
                        <TransactionDateTime>29 Apr 2024 17:05</TransactionDateTime>
                        <TransactionAmount>-$30.00</TransactionAmount>
                    </TransactionDiv>
                    <TransactionDiv>
                        <TransactionTitle>Parking fine + wheel clamp removal</TransactionTitle>
                        <TransactionCategory>
                            <CategoryButton>Others</CategoryButton>
                        </TransactionCategory>
                        <TransactionGoal>
                            <GoalName>Save $90 in 30 days</GoalName>
                            <GoalStatus>Failed</GoalStatus>
                        </TransactionGoal>
                        <TransactionDateTime>31 Mar 2024 03:46</TransactionDateTime>
                        <TransactionAmount>-$65.00</TransactionAmount>
                    </TransactionDiv>
                    <TransactionDiv>
                        <TransactionTitle>Apple Music</TransactionTitle>
                        <TransactionCategory>
                            <CategoryButton>Subscriptions</CategoryButton>
                        </TransactionCategory>
                        <TransactionGoal>
                            <GoalName>Save $90 in 14 days</GoalName>
                            <GoalStatus>Completed</GoalStatus>
                        </TransactionGoal>
                        <TransactionDateTime>17 Jan 2024 08:00</TransactionDateTime>
                        <TransactionAmount>-$13.90</TransactionAmount>
                    </TransactionDiv>
                </TransactionBody>
        </>
    )
}

const CoinsTable = () => {
    return (
        <>
            <TransactionBody>
                    <TableHead>
                        <CoinTitleHead>Description</CoinTitleHead>
                        <CoinTypeHead>Type</CoinTypeHead>
                        <CoinGoalHead>Goal</CoinGoalHead>
                        <CoinDateTimeHead>Date</CoinDateTimeHead>
                        <CoinAmountHead>Amount</CoinAmountHead>
                    </TableHead>
                    <TransactionDiv>
                        <CoinTitle>Unlock Ninja Skin</CoinTitle>
                        <CoinType>
                            <CoinTypeButton>Purchase</CoinTypeButton>
                        </CoinType>
                        <CoinGoal>
                            <CoinGoalName>-</CoinGoalName>
                            <CoinGoalStatus>-</CoinGoalStatus>
                        </CoinGoal>
                        <CoinDateTime>28 Jun 2024 14:44</CoinDateTime>
                        <CoinAmount isSpending >
                            -25000
                            <OinkCoin srcSet="icons/coin.png" />
                        </CoinAmount>
                    </TransactionDiv>
                    <TransactionDiv>
                        <CoinTitle>Completed "Save $90 in 14 days"</CoinTitle>
                        <CoinType>
                            <CoinTypeButton>Reward Bonus</CoinTypeButton>
                        </CoinType>
                        <CoinGoal>
                            <CoinGoalName>Save $90 in 14 days</CoinGoalName>
                            <CoinGoalStatus>Completed</CoinGoalStatus>
                        </CoinGoal>
                        <CoinDateTime>23 Jan 2024 09:57</CoinDateTime>
                        <CoinAmount >
                            +5000
                            <OinkCoin srcSet="icons/coin.png" />
                        </CoinAmount>
                    </TransactionDiv>
                    <TransactionDiv>
                        <CoinTitle>Completed "Save $90 in 14 days"</CoinTitle>
                        <CoinType>
                            <CoinTypeButton>Reward</CoinTypeButton>
                        </CoinType>
                        <CoinGoal>
                            <CoinGoalName>Save $90 in 14 days</CoinGoalName>
                            <CoinGoalStatus>Completed</CoinGoalStatus>
                        </CoinGoal>
                        <CoinDateTime>23 Jan 2024 09:57</CoinDateTime>
                        <CoinAmount >
                            +9000
                            <OinkCoin srcSet="icons/coin.png" />
                        </CoinAmount>
                    </TransactionDiv>
                    
                </TransactionBody>
        </>
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
    justify-content: start;
    align-items: center;
    width: 90%;
    height: 10vh;
    margin: 0px auto;
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

const ToolBar = styled.div`
    display: flex;
    justify-content: center;
    width: 60vw;
    height: 36px;
    align-items: center;
`

const SearchBar = styled.input`
    margin: 0px 0px 0px auto;
    width: 20%;
    height: 36px;
    box-shadow: 0px 0px 3px #adadad;
    border-radius: 8px;
    font-size: 16px;
    padding: 0px 15px;
`

const FilterButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 36px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 3px #adadad;
    padding: 0px 5px;
    margin: 0px 0px 0px auto;
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
    width: 90%;
    height: 80vh;
`

const TableHead = styled.div`
    width: 100%;
    height: 40px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: grey;
    text-align: left;
    &:hover {
        background-color: #f8f8f8;
        transition: 0.2s;
    }
`

const HeadTitle = styled.div`
    width: 35%;
    padding-left: 20px;
`

const HeadCategory = styled.div`
    width: 15%;
`

const HeadGoal = styled.div`
    width: 20%;
`

const HeadDateTime = styled.div`
    width: 15%;
`

const HeadAmount = styled.div`
    width: 15%;
    text-align: right;
    padding-right: 20px;
`

const TransactionDiv = styled.div`
    width: 100%;
    height: 70px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    text-align: left;
    border-top: 1px solid #cecece;
    &:hover {
        background-color: #f1f1f1;
        transition: 0.2s;
    }
`

const TransactionTitle = styled.div`
    width: 35%;
    padding-left: 20px;
    font-weight: bold;
`

const TransactionCategory = styled.div`
    width: 15%;
    display: flex;
    justify-content: start;
    align-items: center;
`

const CategoryButton = styled.div`
    height: 24px;
    background-color: #e8e8e8;
    border-radius: 20px;
    text-align: center;
    padding: 2px 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        filter: brightness(0.95);
        transition: 0.1s;
    }
`

const TransactionGoal = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
`

const GoalName = styled.div`
    font-size: 14px;
`

const GoalStatus = styled.div`
    font-size: 12px;
    font-weight: bold;
    color: grey;
`

const TransactionDateTime = styled.div`
    width: 15%;
    font-size: 14px;
`

const TransactionAmount = styled.div`
    width: 15%;
    text-align: right;
    padding-right: 20px;
`

const CoinTitleHead = styled.div`
    width: 35%;
    padding-left: 20px;
`

const CoinTypeHead = styled.div`
    width: 15%;
`

const CoinGoalHead = styled.div`
    width: 20%;
`

const CoinDateTimeHead = styled.div`
    width: 15%;
`

const CoinAmountHead = styled.div`
    width: 15%;
    text-align: right;
    padding-right: 20px;
`

const CoinTitle = styled.div`
    width: 35%;
    padding-left: 20px;
    font-weight: bold;
`

const CoinType = styled.div`
    width: 15%;
    display: flex;
    justify-content: start;
    align-items: center;
`

const CoinTypeButton = styled.div`
    height: 24px;
    background-color: #e8e8e8;
    border-radius: 20px;
    text-align: center;
    padding: 2px 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        filter: brightness(0.95);
        transition: 0.1s;
    }
`

const CoinGoal = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
`

const CoinGoalName = styled.div`
    font-size: 14px;
`

const CoinGoalStatus = styled.div`
    font-size: 12px;
    font-weight: bold;
    color: grey;
`

const CoinDateTime = styled.div`
    width: 15%;
    font-size: 14px;
`

const CoinAmount = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 5px;
    width: 15%;
    text-align: right;
    padding-right: 20px;
    color: ${(props) => props.isSpending ? "red":"green"};
`

const OinkCoin = styled.img`
    width: 16px; 
    height: 16px;
`

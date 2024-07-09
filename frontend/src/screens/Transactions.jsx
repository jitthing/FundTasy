import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import NewRecordForm from "../components/NewRecordForm";
import getTransactions from "../utils/getTransactions";
import formatCurrency from "../utils/formatCurrency";
import getAllGoals from "../utils/getAllGoals";
import getCoinTransactions from "../utils/getCoinTransactions";
import axios from "axios";
import { IoClose } from "react-icons/io5";
const moment = require("moment");


export default function Transactions() {
  const [type, changeType] = useState("spending");
  const [formActive, showForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [updateTransactions, setUpdateTransactions] = useState(false);
  const [allGoals, setAllGoals] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [coinTransactions, setCoinTransactions] = useState([]);
  
  useEffect(() => {
    const fetchCoinTransactions = async () => {
      try {
        const coinTransactionResponse = await getCoinTransactions();
        setCoinTransactions(coinTransactionResponse.coinTransactions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCoinTransactions();
  })

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionResponse = await getTransactions();
        setTransactions(transactionResponse.transactions);
        const activeGoalsRepsonse = await getAllGoals();
        setAllGoals(activeGoalsRepsonse.userGoals);
      } catch (error) {
        alert("Failed to fetch transactions", error);
      }
    };
    fetchTransactions();
  }, [updateTransactions]);

  const deleteTransaction = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete_transaction/${id}`);
      if (response.status === 200) {
        alert("Transaction successfully deleted");
        setUpdateTransactions((prev) => !prev);
      } else {
        alert("Failed to delete transaction: Server responded with status " + response.status);
      }
    } catch (error) {
      alert("Failed to delete transaction: " + error.message);
      console.error("Error deleting transaction:", error);
    }
  };

  const toggleEditModal = (transaction) => {
    setEditTransaction(transaction);
    showForm(true); 
};
  
  const toggleType = (type) => {
    if (type === "spending") {
      changeType("coins");
    } else {
      changeType("spending");
    }
  };

  function openForm() {
    showForm(true);
  }

  function closeForm() {
    showForm(false);
    setEditTransaction(null);
  }

  function findGoal(goalId) {
    return allGoals.find((goal) => goal._id === goalId);
  }
  

  return (
    <PageContainer>
      <Navbar page="transactions" />
      {formActive && (
        <NewRecordForm
          closeForm={closeForm}
          updateTransactions={setUpdateTransactions}
          allGoals={allGoals}
          editTransaction={editTransaction}
        />
      )}
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
            <ToggleButton
              onClick={() => toggleType("coins")}
              active={type === "spending"}
            >
              Spending
            </ToggleButton>
            <ToggleButton
              onClick={() => toggleType("spending")}
              active={type === "coins"}
            >
              Oink Coins
            </ToggleButton>
          </ToggleBar>
          <FilterButton>
            <FilterIcon srcSet="icons/filter.png" />
            <FilterText>Filter</FilterText>
          </FilterButton>
        </TransactionNeck>

        {type === "spending" && <SpendingTable transactions={transactions} deleteTransaction={deleteTransaction} toggleEditModal={toggleEditModal}/>}
        {type === "coins" && <CoinsTable allCoinTransactions={coinTransactions} findGoal={findGoal} />}
      </TransactionContainer>
    </PageContainer>
  );
}

const SpendingTable = ({ transactions, deleteTransaction, toggleEditModal}) => {
  return (
    <>
    
      <TransactionBody>
        <TableHead>
          <HeadTitle>Title</HeadTitle>
          <HeadCategory>Category</HeadCategory>
          <HeadDateTime>Date</HeadDateTime>
          <HeadAmount>Amount</HeadAmount>
        </TableHead>
        {transactions.length <= 0 && <EmptyList>No transactions made yet</EmptyList>}
        {transactions.length > 0 && (
          <TransactionListWrapper>
          {transactions.slice().reverse().map((transaction) => (
            <TransactionDiv key={transaction.id}>
  
              <TransactionTitle >{transaction.title}</TransactionTitle>
              <TransactionCategory>
                <CategoryButton>{transaction.category}</CategoryButton>
              </TransactionCategory>
              <TransactionDateTime>{moment(transaction.date).format("DD MMM YYYY HH:mm")}</TransactionDateTime>
              <TransactionAmount>
                -{formatCurrency(transaction.amount)}              
                <TransactionOptions>
                  <EditIcon
                      src="icons/edit-black.png"
                      alt="Edit"
                      onClick={()=>toggleEditModal(transaction)}
                      style={{ display:"inline-block" }}
                  />
                  <button
                      style={{ display:"inline-block" }} onClick={() => deleteTransaction(transaction._id)}
                  className="z-10 text-gray-600 hover:text-gray-800">
                    <IoClose className="h-6 w-6" />
                  </button>
                </TransactionOptions>
              </TransactionAmount>
            </TransactionDiv>
          ))}
          </TransactionListWrapper>
        )}
      </TransactionBody>
    </>
  );
};

const CoinsTable = ({ allCoinTransactions, findGoal }) => {
  const coinTransactions = allCoinTransactions;
  coinTransactions.map((ct) => {
    if (ct.goal != null && findGoal(ct.goal).status === "Completed") {
      const g = findGoal(ct.goal);
      ct.status = g.status;
      ct.title = g.title;
      ct.price = "Save "+formatCurrency(g.price);
    } else {
      ct.title = "-";
      ct.price = "-";
      ct.status = "-";
    }
  })
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
        {coinTransactions.length <= 0 && (<EmptyList>No Oink Coins earned or spent yet</EmptyList>)}
        {coinTransactions.length > 0 && (
          <>
          {coinTransactions.slice().reverse().map((ct) => (
            <TransactionDiv>
              <CoinTitle>{ct.price === "-" ? ct.description:`Completed "${ct.title}"`}</CoinTitle>
              <CoinType>
                <CoinTypeButton>{ct.type}</CoinTypeButton>
              </CoinType>
              <CoinGoal>
                <CoinGoalName>{ct.price}</CoinGoalName>
                <CoinGoalStatus>{ct.status}</CoinGoalStatus>
              </CoinGoal>
              <CoinDateTime>{moment(ct.date).format("DD MMM YYYY HH:mm")}</CoinDateTime>
              <CoinAmount isSpending={ct.type === "Purchase"}>
                {ct.type === "Purchase" ? "-":"+"}{ct.amount}
                <OinkCoin srcSet="icons/coin.png" />
              </CoinAmount>
            </TransactionDiv>
          ))}
        </>
        )}
      </TransactionBody>
    </>
  );
};

const TransactionListWrapper = styled.div`
  max-height: 70vh; 
  width: 100%;
  overflow-y: auto;
  overflow-x:hidden;

`;

const EditIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 1;
  object-fit: contain;
  cursor: pointer;
  margin-left: 10px; /* Add space between value and icon */
  margin-right: 10px;
  
`;

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
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  width: calc(80vw - 280px);
`;

const TransactionHead = styled.div`
  display: flex;
  height: 10vh;
  align-items: center;
`;

const NewRecordButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;
  height: 40px;
  width: 150px;
  background-color: #645df2;
  color: #fff;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const NewRecordText = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const AddIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const TransactionNeck = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 90%;
  height: 10vh;
  margin: 0px auto;
`;

const ToggleBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #ececec;
  width: 200px;
  height: 36px;
  border-radius: 8px;
  color: #adadad;
`;

const ToggleButton = styled.div`
  height: 80%;
  width: 47%;
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px;
  padding: 4px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#000" : "#adadad")};
  background-color: ${(props) => (props.active ? "#fff" : "#ececec")};
  box-shadow: ${(props) => (props.active ? "0px 0px 4px #cdcdcd" : "none")};
  transition: 0.1s;
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: center;
  width: 60vw;
  height: 36px;
  align-items: center;
`;

const SearchBar = styled.input`
  margin: 0px 0px 0px auto;
  width: 20%;
  height: 36px;
  box-shadow: 0px 0px 3px #adadad;
  border-radius: 8px;
  font-size: 16px;
  padding: 0px 15px;
`;

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
`;

const FilterIcon = styled.img`
  height: 14px;
  width: 14px;
`;

const FilterText = styled.div`
  font-size: 14px;
  width: 60%;
  text-align: right;
`;

const TransactionBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 80vh;
`;

const TableHead = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: grey;
  text-align: center;
  &:hover {
    background-color: #f8f8f8;
    transition: 0.2s;
  }
`;

const HeadTitle = styled.div`
  width: 35%;
  padding-left: 30px;
  text-align: start;
`;

const HeadCategory = styled.div`
  width: 20%;
  text-align: center;
`;

const HeadDateTime = styled.div`
  width: 25%;
`;

const HeadAmount = styled.div`
  width: 20%;
  text-align: left;
`;

const TransactionDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px; 
  padding: 10px 0px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  &:hover {
    background-color: #f1f1f1;
    transition: 0.2s;
  }
  &:last-child {
    border-bottom: none; 
  }
`;

const TransactionTitle = styled.div`
  width: 35%;
  font-weight: bold;
  text-align: left;
  padding-left: 30px;
`;

const TransactionCategory = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
`;

// const TransactionGoal = styled.div`
//   width: 20%;
//   display: flex;
//   flex-direction: column;
// `;

const GoalName = styled.div`
  font-size: 14px;
`;

const GoalStatus = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: grey;
`;

const TransactionDateTime = styled.div`
  width: 25%;
  font-size: 14px;
`;

const TransactionAmount = styled.div`
  width: 20%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
`;

const TransactionOptions = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: end;
`

const CoinTitleHead = styled.div`
  width: 35%;
  padding-left: 20px;
  text-align: left;
`;

const CoinTypeHead = styled.div`
  width: 15%;
`;

const CoinGoalHead = styled.div`
  width: 20%;
`;

const CoinDateTimeHead = styled.div`
  width: 15%;
`;

const CoinAmountHead = styled.div`
  width: 15%;
  text-align: right;
  padding-right: 20px;
`;

const CoinTitle = styled.div`
  width: 35%;
  font-weight: bold;
  padding-left: 20px;
  text-align: left;
`;

const CoinType = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
`;

const CoinGoal = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
`;

const CoinGoalName = styled.div`
  font-size: 14px;
`;

const CoinGoalStatus = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: grey;
`;

const CoinDateTime = styled.div`
  width: 15%;
  font-size: 14px;
`;

const CoinAmount = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 5px;
  width: 15%;
  text-align: right;
  padding-right: 20px;
  color: ${(props) => (props.isSpending ? "red" : "green")};
`;

const OinkCoin = styled.img`
  width: 16px;
  height: 16px;
`;

const EmptyList = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: grey;
  font-style: italic;
`
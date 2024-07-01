import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import NewRecordForm from "../NewRecordForm";
import getUser from "../../utils/getUser";
import getWishlist from "../../utils/getWishlist";
import truncateText from "../../utils/truncateText";
import { IoClose } from "react-icons/io5";

export default function GoalCard({ goals, updateGoals }) {
  const numActiveGoals = goals.length;
  const numEmptyGoals = 3 - numActiveGoals;
  return (
    <GoalContainer>
      <GoalHead>Goals</GoalHead>
      <GoalBody>
        {goals.map((goal) => {
          return (
            <GoalBox
              active
              toSave={goal.price}
              numDays="1"
              startDate={goal.startDate}
              endDate="1/7/24"
              currentSaved={goal.saved.$numberDecimal}
              rate="20"
              lastTopUpAmt="9"
              lastTopUpDate="19/6/24"
              daysLeft="1"
            />
          );
        })}
        {[...Array(numEmptyGoals)].map((e, i) => {
          return <GoalBox updateGoals={updateGoals} />;
        })}

        {/* <GoalBox
          active
          danger
          toSave="150"
          numDays="7"
          startDate="17/6/24"
          endDate="23/6/24"
          currentSaved="78"
          rate="40"
          lastTopUpAmt="9"
          lastTopUpDate="19/6/24"
          daysLeft="1"
        />
        <GoalBox updateGoals={updateGoals} /> */}
      </GoalBody>
    </GoalContainer>
  );
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
  const percentage = (parseInt(currentSaved) / parseInt(toSave)) * 100 + "%";

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [wishlistItems, setItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const wishlistData = await getWishlist();
        setItems(wishlistData.items);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  if (isActive) {
    return (
      <ActiveGoal>
        <GoalInfo>
          <Goal>
            <div style={{ display: "inline-block", fontWeight: "bold" }}>
              Save ${toSave} in {numDays} days{" "}
            </div>
            <div
              style={{
                display: "inline-block",
                fontSize: "12px",
                color: "grey",
              }}
            >
              {" "}
              ({startDate} - {endDate})
            </div>
          </Goal>
          <Saved>
            ${currentSaved}{" "}
            <div
              style={{
                display: "inline-block",
                fontSize: "14px",
                fontWeight: "normal",
              }}
            >
              saved
            </div>
          </Saved>
          <Details>
            <LastAdded>
              +${lastTopUpAmt} on {lastTopUpDate}
            </LastAdded>
            <Rate>${rate}/day</Rate>
          </Details>
        </GoalInfo>
        <ProgressDiv>
          <ProgressBar percentage={percentage} />
          <TimeLeft danger={danger}>{daysLeft}d</TimeLeft>
        </ProgressDiv>
      </ActiveGoal>
    );
  } else {
    return (
      <>
        <EmptyGoal onClick={handleModalOpen}>
          <AddIcon srcSet="icons/add-white.png" />
          Add New Goal
        </EmptyGoal>
        {isModalOpen && (
          <Modal
            onClose={handleModalClose}
            dropdownItems={wishlistItems}
            updateGoals={props.updateGoals}
          />
          //<NewRecordForm />
        )}
      </>
    );
  }
}

const Modal = ({ onClose, dropdownItems, updateGoals }) => {
  const [price, setPrice] = React.useState("");
  const [item, setItem] = React.useState("");

  const handleSelectChange = (event) => {
    const item = dropdownItems.find(
      //changed it to id instead cause of string slicing
      (dropdownItem) => dropdownItem._id === event.target.value
    );
    if (item) {
      setPrice(item.price);
      setItem(item.name);
    }
  };

  const handleAddGoal = async () => {
    const userObj = await getUser();
    const userId = userObj.user.username;
    try {
      const body = { title: item, price: price, username: userId };
      // console.log(body);
      const response = await axios.post(
        "http://localhost:8000/add_active_goal",
        body
      );
      if (response.status === 200) {
        onClose();
        updateGoals((prev) => !prev);
      }
    } catch (error) {
      alert(`${error.response.data.message}`);
    }
  };
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} className="py-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <IoClose className="h-6 w-6" />
        </button>
        <h2 className="text-lg text-gray-700 font-semibold mb-4">
          Choose an item from your wishlist:
        </h2>
        <select
          onChange={handleSelectChange}
          className="form-select block w-full text-base border-gray-300 focus:ring-blue-500 focus:border-blue-500
          py-2 pl-3 pr-10 sm:text-sm rounded-md"
        >
          <option selected disabled hidden>
            ---
          </option>
          {dropdownItems.map((item) => {
            return (
              <option value={item._id} title={item.name}>
                {truncateText(item.name, 50)}
              </option>
            );
          })}
        </select>
        <h3 className="text-lg text-gray-700 font-semibold mb-4">Price:</h3>
        <div className="block w-full px-3 py-1 mb-4 text-base text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          {price ? "$" + String(price) : ""}
        </div>
        <button
          onClick={handleAddGoal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Goal
        </button>
      </ModalContent>
    </ModalBackdrop>
  );
};

function ProgressBar(props) {
  const percentage = props.percentage;
  return (
    <>
      <ProgressBase>
        <ProgressFill style={{ width: percentage }} />
      </ProgressBase>
    </>
  );
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
`;

const GoalBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  width: 100%;
`;

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
    filter: brightness(0.9);
  }
`;

const AddIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 0px auto;
  filter: brightness(0.7);
  ${EmptyGoal}:hover & {
    filter: brightness(0.6);
    transition: 0.1s;
  }
`;

const ActiveGoal = styled.div`
  width: 30%;
  height: 100%;
  background-color: #fff;
`;

const Goal = styled.div`
  text-align: left;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const GoalInfo = styled.div`
  height: 80%;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Saved = styled.div`
  text-align: left;
  font-size: 28px;
  font-weight: bold;
  margin-top: 5px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: grey;
  height: 20%;
  width: 100%;
`;

const Rate = styled.div`
  text-align: right;
  color: #000;
`;

const LastAdded = styled.div`
  text-align: left;
`;

const ProgressDiv = styled.div`
  width: 100%;
  height: 10%;
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const ProgressBase = styled.div`
  width: 80%;
  height: 8px;
  border-radius: 4px;
  background-color: #ececec;
`;

const ProgressFill = styled.div`
  height: 8px;
  border-radius: 4px;
  background-color: #4bb543;
`;

const TimeLeft = styled.div`
  height: 16px;
  width: 15%;
  border-radius: 8px;
  background-color: ${(props) => (props.danger ? "#ffbaba" : "#a5cda5")};
  color: ${(props) => (props.danger ? "#c23434" : "#138513")};
  font-weight: bold;
  font-size: 12px;
`;

const ModalBackdrop = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 15%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: left;
`;

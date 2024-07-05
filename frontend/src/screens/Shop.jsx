import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar.js";
import axios from "axios";
import { useEffect, useState } from "react";
// import { calcPosFromAngles } from "@react-three/drei";
// import { flushGlobalEffects } from "@react-three/fiber";
import FilterPigs from "../components/filterPigs.js";
import BuyMenu from "../components/buyMenu.js";

// TODO:
// 1. Fetch the list of owned pigs from the backend
// 2. Filter menu
// 3. Filter form
// 4. Buy menu

export default function Shop() {

  const [unownedFilter, setUnownedFilter] = useState(true); // Filter for unowned pigs
  const [ownedFilter, setOwnedFilter] = useState(true);     // Filter for owned pigs
  const [models, setModels] = useState([]);         // Array to store models
  const [ownedPigs, setOwnedPigs] = useState([]);   // Array to store owned Pigs
  const [formActive, showForm] = useState(false); // For filter menu
  const [buyMenuActive, showBuyMenu] = useState(false); // For buy menu
  const [lastPreviewedPig, setLastPreviewedPig] = useState(""); // For buy menu
    
  function toggleUnownedFilter() {
    setUnownedFilter(!unownedFilter);
  }

  function toggleOwnedFilter() {
    setOwnedFilter(!ownedFilter);
  } 

  function openBuyMenu() {
    showBuyMenu(true);
  }

  function closeBuyMenu() {
    showBuyMenu(false);
  }

  function handleLastPreviewedPig(pigName) {
    setLastPreviewedPig(pigName);
  }

  function openForm() {
    showForm(true);
  }

  function closeForm() {
    showForm(false);
  }

  function checkIfOwned(pigname) {
    return ownedPigs.includes(pigname);
  }
  useEffect(() => {
  async function fetchOwnedPigs() {
    try {
        const response = await axios.post("http://localhost:8000/get_owned_pigs", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          const data = await response.data;
          setOwnedPigs(data);
    } catch (error) {
        console.error("Failed to fetch ownedPigs", error);
    }
  }
  fetchOwnedPigs();
}, []);

  const unownedPigs = models.filter((model) => !ownedPigs.includes(model));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post("http://localhost:8000/all_models");   
        const data = await response.data;
        // console.log(data);
        setModels(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);




  return (
    <PageContainer>
      <Navbar page="shop" />
      {formActive && (
        <FilterPigs
          closeForm={closeForm}
          toggleUnownedFilter={toggleUnownedFilter}
          toggleOwnedFilter={toggleOwnedFilter}
          ownedFilter={ownedFilter}
          unownedFilter={unownedFilter}
        />
      )}
      {buyMenuActive && <BuyMenu closeBuyMenu={closeBuyMenu} pigName={"Copper"}/>}
      <ShopContainer>
        <ShopHead>
          <ShopTitle>Shop</ShopTitle>
          <FilterButton onClick={openForm}>
            <FilterIcon srcSet="icons/filter.png" />
            <FilterText>Filter</FilterText>
          </FilterButton>
          <div style={{ width: "200px" }}>
            <Moneybar>
              <BigCoin srcSet="icons/coin.png" />
              <MoneybarText>????</MoneybarText>
            </Moneybar>
          </div>
        </ShopHead>
        <ShopBody>
          {/* <PigCard pigname="basic" pigTitle="Basic" owned />
          <PigCard pigname="ninja" pigTitle="Ninja" owned /> */}
          {/* {Object.keys(mypigs).map((model) => (
            <PigCard pigname={model} pigTitle={mypigs[model]} />
          ))} */}
          {ownedFilter && ownedPigs.map((model) => (
            <PigCard 
            pigname={model.toLowerCase()} pigTitle={model} owned={true} 
            openBuyMenu={openBuyMenu}
            />
          ))}
          {unownedFilter && unownedPigs.map((model) => (
            <PigCard 
            pigname={model.toLowerCase()} pigTitle={model} owned={false} 
            openBuyMenu={openBuyMenu}
            />
          ))}
        </ShopBody>
      </ShopContainer>
    </PageContainer>
  );
}

function PigCard(props) {
  const pigimg = `images/${props.pigname}.png`;

  return (
    <CardDiv>
      <PigImage srcSet={pigimg} />
      <CardInfo>
        <CardTitle>{props.pigTitle}</CardTitle>
        {props.owned ? (
          <OwnedOption>Owned</OwnedOption>
        ) : (
          <BuyOption onClick={props.openBuyMenu}>
            <BuyText>Buy</BuyText>
            <SmallCoin srcSet="icons/coin.png" />
            <CardPrice>???</CardPrice>
          </BuyOption>
        )}
      </CardInfo>
    </CardDiv>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  font-family: Inter, sans-serif;
`;

const ShopHead = styled.div`
  display: flex;
  height: 10vh;
  align-items: center;
`;

const ShopTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  width: calc(80vw - 200px);
`;

const Moneybar = styled.div`
  display: flex;
  width: 120px;
  height: 40px;
  border-radius: 20px;
  background-color: #ececec;
  justify-content: space-between;
`;

const BigCoin = styled.img`
  height: 40px;
  width: 40px;
`;

const SmallCoin = styled.img`
  height: 20px;
  width: 20px;
  vertical-align: middle;
  margin: 5px 0px 5px auto;
`;

const MoneybarText = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 0px 20px 0px auto;
  padding: 5px 0px;
`;

const ShopBody = styled.div`
  height: calc(100vh - 10vh);
  display: flex;
  padding: 20px 40px;
  gap: 20px;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-x: hidden;
`;

const CardDiv = styled.div`
  width: calc((80vw - 140px) / 3);
  height: calc((100vh - 140px) / 2);
  min-width: 240px;
  min-height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  border: 1px solid #ececec;
  border-radius: 16px;
`;

const PigImage = styled.img`
  height: 80%;
  object-fit: cover;
  background-color: #ececec;
  border-radius: 10px;
`;

const CardInfo = styled.div`
  height: 20%;
  display: flex;
  font-size: 20px;
  align-items: center;
  vertical-align: middle;
`;

const CardTitle = styled.div`
  width: 60%;
  font-weight: bold;
  margin-right: auto;
  text-align: left;
  vertical-align: middle;
  padding: 0px 10px;
`;

const CardPrice = styled.div`
  margin-left: 5px;
`;

const OwnedOption = styled.div`
  text-align: right;
  padding: 0px 10px;
  vertical-align: middle;
  color: green;
  font-weight: bold;
`;

const BuyOption = styled.div`
  width: 40%;
  height: 70%;
  font-weight: bold;
  background-color: #645df2;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
    transition: 0.2s;
  }
`;

const BuyText = styled.div`
  margin-right: auto;
  font-size: 16px;
  vertical-align: middle;
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
  margin: 0px 50px 0px auto;
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

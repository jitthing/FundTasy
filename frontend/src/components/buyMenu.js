import styled from "styled-components";
import getUser from "../utils/getUser";
import axios from "axios";

export default function BuyMenu({ closeBuyMenu, pigName, pigPrice }) {
  const handleBuyPig = async (pigName, pigPrice) => {
    try {
      const userObj = await getUser();
      const userId = userObj.user.username;
      const response = await axios.post("http://localhost:8000/buy_pig", {
        username: userId,
        pigName: pigName,
        pigPrice: pigPrice,
      });
      if (response) {
        alert("Pig Bought!");
        closeBuyMenu();
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <BuyMenuBackdrop onclick={closeBuyMenu}>
      <BuyMenuModal onClick={(e) => e.stopPropagation()}>
        <BuyMenuHead>
          <CloseIcon srcSet="icons/close.png" onClick={closeBuyMenu} />
          <BuyMenuTitle>Confirm Purchase</BuyMenuTitle>
        </BuyMenuHead>
        <BuyMenuBody>
          <PigCard pigname={pigName} />
          {/* <BuyMenuLabel>Are you sure you want to buy this pig?</BuyMenuLabel> */}
        </BuyMenuBody>
        <BuyMenuBottom>
          <BuyOption onClick={() => handleBuyPig(pigName, pigPrice)}>
            <BuyText>Confirm</BuyText>
            <SmallCoin srcSet="icons/coin.png" />
            <CardPrice>{pigPrice}</CardPrice>
          </BuyOption>
        </BuyMenuBottom>
      </BuyMenuModal>
    </BuyMenuBackdrop>
  );
}

function PigCard(props) {
  const pigimg = `images/${props.pigname}.png`;
  return (
    <CardDiv>
      <PigImage srcSet={pigimg} />
      <CardInfo>
        <CardTitle>{props.pigTitle}</CardTitle>
      </CardInfo>
    </CardDiv>
  );
}

const BuyMenuBackdrop = styled.div`
  z-index: 10;
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

const BuyMenuModal = styled.div`
  width: 40%;
  height: 45%;
  background-color: #fff;
  border-radius: 25px;
  padding: 10px;
`;

const CloseIcon = styled.img`
  height: 16px;
  width: 16px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.85);
  }
`;

const BuyMenuHead = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BuyMenuTitle = styled.div`
  width: calc(100% - 20px);
  font-size: 16px;
  font-weight: bold;
`;

const BuyMenuBody = styled.div`
  height: 70%;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;
const BuyMenuBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const BuyOption = styled.div`
  width: 50%;
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

const SmallCoin = styled.img`
  height: 20px;
  width: 20px;
  vertical-align: middle;
  margin: 5px 0px 5px auto;
`;

const CardPrice = styled.div`
  margin-left: 5px;
`;

// const BuyMenuLabel = styled.div`
//   text-align: center;
//   font-weight: bold;
//   font-size: 14px;
// `;

const PigImage = styled.img`
  height: 80%;
  object-fit: cover;
  background-color: #ececec;
  border-radius: 10px;
`;

const CardDiv = styled.div`
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

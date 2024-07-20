import styled from "styled-components";
import getUser from "../../utils/getUser";
import axios from "axios";
import Toastify from "toastify-js";

export default function BuyMenu({
  closeBuyMenu,
  pigName,
  pigPrice,
  userCoins,
  updatePigs,
  models,
  ownedPigs,
  setLastBoughtPig,
  setShowPigReveal
}) {
  const generateMysteryPig = () => {
    const ownedNames = ownedPigs.map((pig) => pig.modelName);
    const availablePigs = models.filter((model) => !ownedNames.includes(model.modelName));
    const selectedPig = availablePigs[Math.floor(availablePigs.length * Math.random())];
    return {name: selectedPig.modelName, price: 30000};
  }

  const handleBuyPig = async (pigName, pigPrice) => {
    try {
      let name = pigName;
      let price = pigPrice;
      let mystery = false;
      if (name === "Mystery") {
        const generatedPig = generateMysteryPig();
        name = generatedPig.name;
        price = generatedPig.price;
        mystery = true;
      }
      const userObj = await getUser();
      const userId = userObj.user.username;
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/buy_pig`, {
        username: userId,
        pigName: name,
        pigPrice: price
      });
      if (response) {
        setLastBoughtPig(name);
        if (mystery) {
          setShowPigReveal(true);
          setTimeout(() => {
            Toastify({
              text: response.data.message,
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
                height: "48px",
                position: "absolute",
                left: "calc(60vw - 75px)",
                borderRadius: "6px",
                padding: "10px 15px",
                textAlign: "center",
                zIndex: "100",
              },
            }).showToast();
          }, 5000);
        } else {
          Toastify({
            text: response.data.message,
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
              height: "48px",
              position: "absolute",
              left: "calc(60vw - 75px)",
              borderRadius: "6px",
              padding: "10px 15px",
              textAlign: "center",
              zIndex: "100",
            },
          }).showToast();
        }
        updatePigs((prev) => !prev);
        closeBuyMenu();
      }
    } catch (error) {
      Toastify({
        text: `${error.response.data.message}`,
        duration: 2000,
        gravity: "top",
        position: "center",
        offset: {
          y: 10,
        },
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "red",
          color: "#fff",
          boxShadow: "0px 0px 4px #888888",
          width: "fit-content",
          height: "48px",
          position: "absolute",
          left: "calc(50vw - 50px)",
          borderRadius: "6px",
          padding: "10px 15px",
          textAlign: "center",
          zIndex: "100",
        },
      }).showToast();
    }
  };

  const affordable = pigName === "Mystery" ? userCoins >= 30000:userCoins >= pigPrice;

  return (
    <BuyMenuBackdrop onclick={closeBuyMenu}>
      <BuyMenuModal onClick={(e) => e.stopPropagation()}>
        <BuyMenuHead>
          <CloseIcon srcSet="icons/close.png" onClick={closeBuyMenu} />
          <BuyMenuTitle>Confirm Purchase</BuyMenuTitle>
        </BuyMenuHead>
        <BuyMenuBody>
          <PigCard pigname={pigName} pigTitle={pigName} />
        </BuyMenuBody>
        <BalanceLabel>Final Balance {userCoins - pigPrice} Coinks</BalanceLabel>
        <BuyMenuBottom>
          {affordable ? (
            <BuyOption onClick={() => handleBuyPig(pigName, pigPrice)}>
              <BuyText>Confirm</BuyText>
              <SmallCoin srcSet="icons/coin.png" />
              <CardPrice>{pigPrice}</CardPrice>
            </BuyOption>
          ) : (
            <InsufficientLabel>Insufficient Funds!</InsufficientLabel>
          )}
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
  font-size: 20px;
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

const InsufficientLabel = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: red;
`;

const BalanceLabel = styled.div`
  vertical-align: middle;
  text-align: center;
  font-size: 12px;
  color: #b3b3b3;
`;

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
  width: 100%;
  font-weight: bold;
  margin-right: auto;
  text-align: middle;
  vertical-align: middle;
  padding: 0px 10px;
`;

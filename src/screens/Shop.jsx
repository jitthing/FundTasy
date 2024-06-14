import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import mypigs from "../modelinfo.js";

export default function Shop() {
    return (
        <PageContainer>
            <Navbar page="shop" />
            <ShopContainer>
                <ShopHead>
                    <ShopTitle>Shop</ShopTitle>
                    <div style={{ width:"200px" }}>
                        <Moneybar>
                            <BigCoin srcSet="icons/coin.png" />
                            <MoneybarText>????</MoneybarText>
                        </Moneybar>
                    </div>
                </ShopHead>
                <ShopBody>
                    <PigCard pigname="basic" pigTitle="Basic" owned/>
                    {Object.keys(mypigs).map((model) =>(
                        <PigCard pigname={model} pigTitle={mypigs[model]}/>
                    ))}
                </ShopBody>
            </ShopContainer>
        </PageContainer>
    )
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
                ):(
                    <BuyOption>
                        <BuyText>Buy</BuyText>
                        <SmallCoin srcSet="icons/coin.png" />
                        <CardPrice>???</CardPrice>
                    </BuyOption>
                )}
            </CardInfo>
        </CardDiv>
    )
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

const ShopContainer = styled.div`
    width: 80vw;
    font-family: Inter, sans-serif;
`

const ShopHead = styled.div`
    display: flex;
    height: 80px;
    align-items: center;
`

const ShopTitle = styled.div`
    font-weight: bold;
    font-size: 24px;
    width: calc(80vw - 200px);
`

const Moneybar = styled.div`
    display: flex;
    width: 120px;
    height: 40px;
    border-radius: 20px;
    background-color: #ececec;
    justidy-content: space-between;
`

const BigCoin = styled.img`
    height: 40px;
    width: 40px;
`

const SmallCoin = styled.img`
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin: 5px 0px 5px auto;
`

const MoneybarText = styled.div`
    font-size: 20px;
    font-weight:bold;
    margin: 0px 20px 0px auto;
    padding: 5px 0px;
`

const ShopBody = styled.div`
    height: calc(100vh - 80px);
    display: flex;
    padding: 20px 40px;
    gap: 20px;
    flex-wrap: wrap;
    overflow: scroll;
    overflow-x: hidden;
`

const CardDiv = styled.div`
    width: calc((80vw - 140px)/3);
    height: calc((100vh - 140px)/2);
    min-width: 240px;
    min-height: 200px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    border: 1px solid #ececec;
    border-radius: 16px;
`

const PigImage = styled.img`
    height: 80%;
    object-fit: cover;
    background-color: #ececec;
    border-radius: 10px;
`

const CardInfo = styled.div`
    height: 20%;
    display: flex;
    font-size: 20px;
    align-items: center;
    vertical-align: middle;
`

const CardTitle = styled.div`
    width: 60%;
    font-weight:bold;
    margin-right: auto;
    text-align: left;
    vertical-align: middle;
    padding: 0px 10px;
`

const CardPrice = styled.div`
    margin-left: 5px;
`

const OwnedOption = styled.div`
    text-align: right;
    padding: 0px 10px;
    vertical-align: middle;
    color: green;
    font-weight: bold;
`

const BuyOption = styled.div`
    width: 40%;
    height: 70%;
    font-weight:bold;
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
`

const BuyText = styled.div`
    margin-right: auto;
    font-size: 16px;
    vertical-align: middle;
`

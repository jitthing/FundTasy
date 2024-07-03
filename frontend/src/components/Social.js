import * as React from "react";
import styled from "styled-components";
import PiggyBankCard from "./HomePageComponents/PiggyBankCard";

export default function Social({bankBalance, currentTime}) {
    return (
        <Div>
            
            <PiggyBankCard bankBalance={bankBalance} currentTime={currentTime} />
            <SocialContainer>
                <SocialTitle>Friends</SocialTitle>
                <SearchBar placeholder="Find a friend" />
                <FriendList />
            </SocialContainer>
        </Div>
    )
}

function FriendList() {
    return (
        <Leaderboard>
            <LeaderboardHead>Leaderboard</LeaderboardHead>
            <LeaderboardRow style={{ height:"30px" }}>
                <LeaderboardStat style={{ width:"15%" }} >Rank</LeaderboardStat>
                <LeaderboardStat style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Fund</LeaderboardStat>
                <LeaderboardStat style={{ width:"25%" }} >Last 30d</LeaderboardStat>
                <LeaderboardStat style={{ width:"15%" }} >Total</LeaderboardStat>
            </LeaderboardRow>
            <LeaderboardRow>
                <LeaderboardCell style={{ width:"15%" }} >1</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Matthias</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >37</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >2160</LeaderboardCell>
            </LeaderboardRow>
            <LeaderboardRow>
                <LeaderboardCell style={{ width:"15%" }} >2</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Brian</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >106</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >2089</LeaderboardCell>
            </LeaderboardRow>
            <LeaderboardRow>
                <LeaderboardCell style={{ width:"15%" }} >3</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Dwight</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >511</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >2081</LeaderboardCell>
            </LeaderboardRow>
            <LeaderboardRow>
                <LeaderboardCell style={{ width:"15%" }} >4</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Jitt</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >235</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >2060</LeaderboardCell>
            </LeaderboardRow>
            <LeaderboardRow>
                <LeaderboardCell style={{ width:"15%" }} >5</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Keegan</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >330</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >1947</LeaderboardCell>
            </LeaderboardRow>
            <LeaderboardRow>
                <LeaderboardCell style={{ width:"15%" }} >6</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Kelvin</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >228</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >1944</LeaderboardCell>
            </LeaderboardRow>
            <LeaderboardRow>
                <LeaderboardCell style={{ width:"15%" }} >7</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Fu Qiang</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >66</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >1472</LeaderboardCell>
            </LeaderboardRow>
            <LeaderboardEnd>View More</LeaderboardEnd>
        </Leaderboard>
    )
}

const Div = styled.div`
    display: flex;
    align-content: flex-end;
    gap: 10px;
    max-width: 360px;
    width: 30vw;
    height: 100vh;
    flex-direction: column;
    font-size: 24px;
    color: #7b7b7b;
    font-family: Inter, sans-serif;
    margin: 0px;
    padding: 10px 5px 10px 0px;
    margin-left: auto;
    margin-right: 5px;
`
const SocialContainer = styled.div`
    display: flex;
    align-content: flex-end;
    max-width: 360px;
    width: 100%;
    height: 72%;
    flex-direction: column;
    font-size: 24px;
    color: #7b7b7b;
    font-family: Inter, sans-serif;
    margin: 0px;
    border-radius: 8px;
    box-shadow: 0px 0px 2px #bcbcbc;
    padding: 10px 20px;
`

const SocialTitle = styled.div`
    color: #000;
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

const SearchBar = styled.input`
    width: 100%;
    height: 30px;
    border: 1px solid #bdbdbd;
    border-radius: 15px;
    font-size: 16px;
    padding: 0px 15px;
    margin-top: 10px;
`

const Leaderboard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 80%;
    margin: 20px auto 0px;
`

const LeaderboardHead = styled.div`
    width: 100%;
    height: 30px;
    background-color: #000;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 20px 20px 0px 0px;
    padding: 3px;
`

const LeaderboardRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #000;
`

const LeaderboardStat = styled.div`
    font-weight:bold;
    color: #6d6d6d;
    padding: 4px 0px;
    border-bottom: 1px solid #7b7b7b;
`

const LeaderboardCell = styled.div`
    font-weight:bold;
    padding: 10px 0px;
    border-bottom: 1px solid #7b7b7b;
`

const LeaderboardEnd = styled.div`
    width: 100%;
    height: 30px;
    background-color: #000;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 0px 0px 20px 20px;
    padding: 2px;
`


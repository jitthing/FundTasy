import React, { useEffect, useState } from "react";
import styled from "styled-components";
import truncateText from "../utils/truncateText";
import getUser from "../utils/getUser";
import axios from "axios";
import Toastify from "toastify-js"; 

export default function Social({ userInfo }) {

    const { friendField, setFriendField } = useState("");

    // Handle sending of friend request
    const handleSendFriendRequest = async(friendName) => {

        const userObj = await getUser();
        const userId = userObj.user.username;
        try {
            console.log("Attempting to send friend request to " + friendName);
            const response = await axios.post("http://localhost:8000/new_friend_request", {
                username: userId,
                friendName: friendName
            });
            if (response) {
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
                      width: "200px",
                      height: "48px",
                      position: "absolute",
                      left: "calc(50vw - 50px)",
                      borderRadius: "6px",
                      padding: "10px",
                      textAlign: "center",
                      zIndex: "100",
                    },
                  }).showToast();
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
                  width: "250px",
                  height: "70px",
                  position: "absolute",
                  left: "calc(50vw - 50px)",
                  borderRadius: "6px",
                  padding: "10px",
                  textAlign: "center",
                  zIndex: "100",
                },
              }).showToast();
        }
    };

    return (        
        <SocialContainer>
            <SocialTitle>Friends</SocialTitle>
            <SearchBar 
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        handleSendFriendRequest(e.target.value);
                    }}
                placeholder="Find a friend" />
            <FriendList currentUser={userInfo} />
        </SocialContainer>
    )
}

function FriendList({ currentUser }) {
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
            <LeaderboardRow isCurrentUser={currentUser.username === currentUser.username} >
                <LeaderboardCell style={{ width:"15%" }} >?</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >{truncateText(currentUser.firstName+" "+currentUser.lastName+" (me)", 17)}</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >{parseFloat(currentUser.coinBalance).toFixed(0)}</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >{parseFloat(currentUser.bankBalance).toFixed(2)}</LeaderboardCell>
            </LeaderboardRow>
            <LeaderboardEnd>View More</LeaderboardEnd>
        </Leaderboard>
    )
}

const SocialContainer = styled.div`
    display: flex;
    align-content: flex-end;
    max-width: 360px;
    width: 100%;
    height: 75%;
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
    &::placeholder {
       color: grey;
    }
    color: #000;
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
    color: ${(props) => props.isCurrentUser ? "#645df2":"#000"};
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


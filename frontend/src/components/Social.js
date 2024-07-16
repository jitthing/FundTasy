import React, { useEffect, useState } from "react";
import styled from "styled-components";
import truncateText from "../utils/truncateText";
import getUser from "../utils/getUser";
import axios from "axios";
import Toastify from "toastify-js"; 
import { IoCheckmark, IoClose } from "react-icons/io5";
import getFriendRequests from "../utils/getFriendRequests";
import getFriends from "../utils/getFriends";
const moment = require("moment");

// TODO: 
// 1. Change leaderboard to show a user's friends
// 2. Show friend requests. Allow user to accept or reject friend requests

export default function Social({ userInfo }) {

    const { friendField, setFriendField } = useState("");
    const [showList, setShowList] = useState("leaderboard");
    const [allRequests, setAllRequests] = useState([]);
    const [friends, setFriends] = useState([]); 

    useEffect(() => {
        async function fetchRequests() {
            try {
                const requests = await getFriendRequests();
                if (requests) {
                    setAllRequests(requests.friendRequests);
                }
            } catch (error) {
                console.log("Unable to fetch friend requests:" + error);
            }
        }
        fetchRequests();
    }, [allRequests]);

    useEffect(() => {
        async function fetchFriends() {
            try {
                const friends = await getFriends();
                console.log(friends.fetchFriendsriends);
                if (friends) {
                    setFriends(friends.friends);
                }
            } catch (error) {
                console.log("Unable to get friends: " + error);
            }
        }
        fetchFriends();
    }, []);

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

    const toggleList = (list) => {
        if (list === "leaderboard") {
            setShowList("requests");
        } else {
            setShowList("leaderboard");
        }
    }

    return (        
        <SocialContainer>
            <SocialTitle>Friends</SocialTitle>
            <SearchBar 
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        handleSendFriendRequest(e.target.value);
                    }}
                placeholder="Find a friend" />
                <ToggleBar>
                    <ToggleButton onClick={() => toggleList(showList)} active={showList === "leaderboard"}>Leaderboard</ToggleButton>
                    <ToggleButton onClick={() => toggleList(showList)} active={showList === "requests"}>Friend Requests</ToggleButton>
                </ToggleBar>
            {showList === "leaderboard" && (<FriendList friends={friends} currentUser={userInfo} />)}
            {showList === "requests" && (<RequestList requests={allRequests} />)}
        </SocialContainer>
    )
}

function FriendList({ currentUser, friends }) {
    return (
        <Leaderboard>
            {/* <LeaderboardHead>Leaderboard</LeaderboardHead> */}
            {/* Only show max 7 rows including user */}
            <LeaderboardRow style={{ height:"30px" }}>
                <LeaderboardStat style={{ width:"15%" }} >Rank</LeaderboardStat>
                <LeaderboardStat style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Fund</LeaderboardStat>
                <LeaderboardStat style={{ width:"25%" }} >Last 30d</LeaderboardStat>
                <LeaderboardStat style={{ width:"15%" }} >Total</LeaderboardStat>
            </LeaderboardRow>
            {/* <LeaderboardRow>
                <LeaderboardCell style={{ width:"15%" }} >1</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Sample User</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >37</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >2160</LeaderboardCell>
            </LeaderboardRow> */}
            {friends.length > 0 && (
                friends
                    .map((friend) => (
                        <LeaderboardRow>
                            <LeaderboardCell style={{ width:"15%" }} >7</LeaderboardCell>
                            <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >friend name</LeaderboardCell>
                            <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >66</LeaderboardCell>
                            <LeaderboardCell style={{ width:"15%" }} >1472</LeaderboardCell>
                        </LeaderboardRow>
                    ))
            )}
            {friends.length === 0 && (
                <EmptyList>You have no friends :</EmptyList>
            )}
            <LeaderboardRow isCurrentUser={currentUser.username === currentUser.username} style={{ marginTop:"auto" }} >
                <LeaderboardCell style={{ width:"15%" }} >?</LeaderboardCell>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >{truncateText(currentUser.firstName+" "+currentUser.lastName+" (me)", 17)}</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >{parseFloat(currentUser.coinBalance).toFixed(0)}</LeaderboardCell>
                <LeaderboardCell style={{ width:"15%" }} >{parseFloat(currentUser.bankBalance).toFixed(2)}</LeaderboardCell>
            </LeaderboardRow>
            <LeaderboardEnd>View More</LeaderboardEnd>
        </Leaderboard>
    )
}

function RequestList({ requests }) {

    // Handle accepting friend request
    const handleAcceptFriendRequest = async(friendName) => {
        const userObj = await getUser();
        const userId = userObj.user.username;
        try {
            // console.log("Attempting to accept friend request from " + friendName);
            // alert("accepting friend request");
            const response = await axios.post("http://localhost:8000/accept_friend_request", {
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

    return (
        <Leaderboard>
            <LeaderboardRow style={{ height:"30px" }}>
                <LeaderboardStat style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >User</LeaderboardStat>
                <LeaderboardStat style={{ width:"25%" }} >Date</LeaderboardStat>
                <LeaderboardStat style={{ width:"30%" }} >Request</LeaderboardStat>
            </LeaderboardRow>
            {/* <LeaderboardRow>
                <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >Sample User</LeaderboardCell>
                <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >16/7/2024</LeaderboardCell>
                <RequestCell style={{ width:"30%" }} >
                    <IoClose className="h-6 w-6 text-red-500 cursor-pointer hover:brightness-90" />
                    <IoCheckmark className="h-6 w-6 text-green-700 cursor-pointer hover:brightness-90" />
                </RequestCell>
            </LeaderboardRow> */}
            {requests
                .slice()
                .reverse()
                .map((request) => (
                    <LeaderboardRow>
                        <LeaderboardCell style={{ width:"45%", textAlign:"left", paddingLeft:"5px" }} >{request.user1}</LeaderboardCell>
                        <LeaderboardCell style={{ width:"25%", fontWeight:"normal" }} >{moment(request.date_requested).format("DD/MM/YYYY")}</LeaderboardCell>
                        <RequestCell style={{ width:"30%" }} >
                            <IoClose className="h-6 w-6 text-red-500 cursor-pointer hover:brightness-50" />
                            {/* <Checkmark size={20} color="green" onClick={() => handleAcceptFriendRequest(request.user1) } /> */}
                            <div onClick={() => handleAcceptFriendRequest(request.user1)}>
                                <IoCheckmark className="h-6 w-6 text-green-700 cursor-pointer hover:brightness-200 on" />
                            </div>
                            
                        </RequestCell>
                    </LeaderboardRow>
                ))}
            {requests.length === 0 && (
                <EmptyList>No outstanding friend requests</EmptyList>
            )}
            <LeaderboardEnd>All Requests</LeaderboardEnd>
        </Leaderboard>
    )
}

const SocialContainer = styled.div`
    display: flex;
    align-content: flex-end;
    max-width: 360px;
    width: 100%;
    height: 75%;
    max-height: 75%;
    overflow-y: hidden;
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

const ToggleBar = styled.div`
    width: 100%;
    margin: 10px auto 5px;
    height: 35px;
    background-color: #ececec;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;
    color: #adadad;
`

const ToggleButton = styled.div`
    height: 80%;
    width: 48%;
    font-weight: bold;
    font-size: 14px;
    border-radius: 6px;
    padding: 4px;
    cursor: pointer;
    color: ${(props) => (props.active ? "#fff" : "#adadad")};
    background-color: ${(props) => (props.active ? "#1e293b" : "#ececec")};
    box-shadow: ${(props) => (props.active ? "0px 0px 4px #cdcdcd" : "none")};
    transition: 0.1s;
`

const Leaderboard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(80% - 30px);
    max-height: calc(80% - 30px);
    margin: 0px auto;
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
    background-color: #1e293b;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 0px 0px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
`

const RequestCell = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
    padding-right: 5px;
    border-bottom: 1px solid #7b7b7b;
`

const EmptyList = styled.div`
    min-height: 73%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: grey;
    font-style: italic;
    font-size: 16px;
    border-bottom: 1px solid #7b7b7b;
`


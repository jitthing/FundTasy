import React, { useEffect, useState } from "react";
import styled from "styled-components";
import truncateText from "../../utils/truncateText";
import getUser from "../../utils/getUser";
import axios from "axios";
import Toastify from "toastify-js";
import { IoCheckmark, IoClose } from "react-icons/io5";
import getFriendRequests from "../../utils/getFriendRequests";
import getFriends from "../../utils/getFriends";
import getAllUsers from "../../utils/getAllUsers";
import UserModal from "./UserModal";
const moment = require("moment");

// TODO:
// 1. Change leaderboard to show a user's friends
// 2. Show friend requests. Allow user to accept or reject friend requests

export default function Social({ userInfo }) {
  const { friendField, setFriendField } = useState("");
  const [showList, setShowList] = useState("leaderboard");
  const [allRequests, setAllRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [showFriendModal, setFriendModal] = useState(false);
  const [currentFriendInfo, setCurrentFriendInfo] = useState(userInfo);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const requests = await getFriendRequests();
        if (requests) {
          setAllRequests(requests.friendRequests);
        }
      } catch (error) {
        console.log("Unable to get friend requests:" + error);
      }
    }
    fetchRequests();
  }, [allRequests]);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const friends = await getFriends();
        if (friends) {
          setFriends(friends.allFriends);
        }
      } catch (error) {
        console.log("Unable to get friends: " + error);
      }
    }
    fetchFriends();
  }, [friends]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getAllUsers();
        if (users) {
          const friendList = new Set(friends.map((friend) => friend.username));
          const allusers = users.allUsernames.filter(
            (user) => !friendList.has(user.username)
          );
          setUsernames(allusers);
        }
      } catch (error) {
        console.log("Unable to fetch usernames: " + error);
      }
    }
    fetchUsers();
  }, [usernames]);

  useEffect(() => {
    function filterSearch() {
      const results = usernames.filter((user) =>
        user.username.includes(userQuery)
      );
      setSearchResults(results);
    }
    filterSearch();
  }, [userQuery]);

  const updateSentRequest = (username) => {
    usernames.forEach((user) => {
      if (user.username === username) {
        user.sentRequest = true;
      }
    });
    searchResults.forEach((result) => {
      if (result.username === username) {
        result.sentRequest = true;
      }
    });
  };

  // Handle sending of friend request
  const handleSendFriendRequest = async (friendName) => {
    const userObj = await getUser();
    const userId = userObj.user.username;
    try {
      const response = await axios.post(
        "http://localhost:8000/new_friend_request",
        {
          username: userId,
          friendName: friendName,
        }
      );
      if (response) {
        updateSentRequest(friendName);
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
  };

  return (
    <SocialContainer>
      <SocialTitle>Friends</SocialTitle>
      <SearchBar
        onKeyDown={(e) => {
            if (e.key === "Enter") handleSendFriendRequest(e.target.value);
        }}
        placeholder="Find a friend"
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
      />
      {userQuery.length > 0 && (
        <SearchResultList>
          {searchResults.length > 0 &&
            searchResults.map((result) => (
              <SearchResult>
                <UserInfoDiv>
                  <UserDP srcSet={`images/${result.displayPig}.png`} />
                  {result.username}
                </UserInfoDiv>
                {!result.sentRequest && (
                  <SendRequestButton
                    onClick={() => handleSendFriendRequest(result.username)}
                  >
                    Add Friend
                  </SendRequestButton>
                )}
                {result.sentRequest && (
                  <SendRequestButton disabled>Request Sent</SendRequestButton>
                )}
              </SearchResult>
            ))}
          {searchResults.length === 0 && (
            <SearchResult
              style={{
                height: "20%",
                fontStyle: "italic",
                color: "grey",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              No user found
            </SearchResult>
          )}
        </SearchResultList>
      )}
      <ToggleBar>
        <ToggleButton
          onClick={() => toggleList(showList)}
          active={showList === "leaderboard"}
        >
          Leaderboard
        </ToggleButton>
        <ToggleButton
          onClick={() => toggleList(showList)}
          active={showList === "requests"}
        >
          Friend Requests
        </ToggleButton>
      </ToggleBar>
      {showList === "leaderboard" && (
        <FriendList 
          friends={friends} 
          currentUser={userInfo} 
          setFriendModal={setFriendModal} 
          showFriendModal={showFriendModal} 
          currentFriendInfo={currentFriendInfo} 
          setCurrentFriendInfo={setCurrentFriendInfo} 
        />
      )}
      {showList === "requests" && <RequestList requests={allRequests} />}
    </SocialContainer>
  );
}

function FriendList({ currentUser, friends, setFriendModal, showFriendModal, currentFriendInfo, setCurrentFriendInfo }) {
  function getName(first, last, iscurrentuser) {
    var name = iscurrentuser
      ? truncateText(first + " " + last, 11)
      : truncateText(first + " " + last, 17);
    if (iscurrentuser) {
      name += " (me)";
    }
    return name;
  }

  let size = Math.min(friends.length, 7);
  const currentUserIndex = friends.findIndex(
    (friend) => friend.username === currentUser.username
  );
  let displayedFriends;
  if (currentUserIndex < size) {
    displayedFriends = friends.slice(0, size);
  } else {
    displayedFriends = [
      ...friends.slice(0, size - 1),
      friends[currentUserIndex],
    ];
  }

  const closeModal = () => {
    setFriendModal(false);
  }

  return (
    <>
    {showFriendModal && (<UserModal closeModal={closeModal} info={currentFriendInfo} />)}
    <Leaderboard>
      <LeaderboardRow style={{ height: "30px" }}>
        <LeaderboardStat style={{ width: "15%" }}>Rank</LeaderboardStat>
        <LeaderboardStat
          style={{ width: "45%", textAlign: "left", paddingLeft: "5px" }}
        >
          Fund
        </LeaderboardStat>
        <LeaderboardStat style={{ width: "25%" }}>Last 30d</LeaderboardStat>
        <LeaderboardStat style={{ width: "15%" }}>Total</LeaderboardStat>
      </LeaderboardRow>
      {friends.length > 1 &&
        displayedFriends.map((friend, index) => (
          <LeaderboardRow
            isCurrentUser={friend.username === currentUser.username}
          >
            <LeaderboardCell style={{ width: "15%" }}>
              {friend.username === currentUser.username
                ? currentUserIndex + 1
                : index + 1}
            </LeaderboardCell>
            <LeaderboardCell
              style={{ width: "45%", textAlign: "left", paddingLeft: "5px", cursor:"pointer" }}
              onClick={() => {setFriendModal(true);setCurrentFriendInfo(friend)}}
            >
              {getName(
                friend.firstName,
                friend.lastName,
                friend.username === currentUser.username
              )}
            </LeaderboardCell>
            <LeaderboardCell style={{ width: "25%", fontWeight: "normal" }}>
              {parseFloat(friend.bankBalance).toFixed(0)}
            </LeaderboardCell>
            <LeaderboardCell style={{ width: "15%" }}>
              {parseFloat(friend.totalSaving).toFixed(0)}
            </LeaderboardCell>
          </LeaderboardRow>
        ))}
      {friends.length === 1 && (
        <>
          <EmptyList>{`You have no friends :(`}</EmptyList>
          <LeaderboardRow
            isCurrentUser={currentUser.username === currentUser.username}
            style={{ marginTop: "auto" }}
          >
            <LeaderboardCell style={{ width: "15%" }}>-</LeaderboardCell>
            <LeaderboardCell
              style={{ width: "45%", textAlign: "left", paddingLeft: "5px", cursor:"pointer" }}
              onClick={() => setFriendModal(true)}
            >
              {truncateText(
                currentUser.firstName + " " + currentUser.lastName + " (me)",
                17
              )}
            </LeaderboardCell>
            <LeaderboardCell style={{ width: "25%", fontWeight: "normal" }}>
              {parseFloat(currentUser.bankBalance).toFixed(0)}
            </LeaderboardCell>
            <LeaderboardCell style={{ width: "15%" }}>
              {parseFloat(currentUser.totalSaving).toFixed(0)}
            </LeaderboardCell>
          </LeaderboardRow>
        </>
      )}
      <LeaderboardEnd>View More</LeaderboardEnd>
    </Leaderboard>
    </>
  );
}

function RequestList({ requests }) {
  // Handle deleting of friend request
  const handleDeleteFriendRequest = async (friendName) => {
    const userObj = await getUser();
    const userId = userObj.user.username;
    try {
      const response = await axios.delete(
        "http://localhost:8000/delete_friend_request",
        {
          data: {
            username: userId,
            friendName: friendName,
          },
        }
      );
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

  // Handle accepting friend request
  const handleAcceptFriendRequest = async (friendName) => {
    const userObj = await getUser();
    const userId = userObj.user.username;
    try {
      // console.log("Attempting to accept friend request from " + friendName);
      // alert("accepting friend request");
      const response = await axios.post(
        "http://localhost:8000/accept_friend_request",
        {
          username: userId,
          friendName: friendName,
        }
      );
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
    <>
    <LeaderboardRow style={{ height: "30px" }}>
        <LeaderboardStat
          style={{ width: "45%", textAlign: "left", paddingLeft: "5px" }}
        >
          User
        </LeaderboardStat>
        <LeaderboardStat style={{ width: "25%" }}>Date</LeaderboardStat>
        <LeaderboardStat style={{ width: "30%" }}>Request</LeaderboardStat>
      </LeaderboardRow>
    <RequestBoard>
      
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
            <LeaderboardCell
              style={{ width: "45%", textAlign: "left", paddingLeft: "5px" }}
            >
              {request.user1}
            </LeaderboardCell>
            <LeaderboardCell style={{ width: "25%", fontWeight: "normal" }}>
              {moment(request.date_requested).format("DD/MM/YYYY")}
            </LeaderboardCell>
            <RequestCell style={{ width: "30%" }}>
              <div onClick={() => handleDeleteFriendRequest(request.user1)}>
                <IoClose className="h-6 w-6 text-red-500 cursor-pointer hover:brightness-50 on" />
              </div>
              <div onClick={() => handleAcceptFriendRequest(request.user1)}>
                <IoCheckmark className="h-6 w-6 text-green-700 cursor-pointer hover:brightness-200 on" />
              </div>
            </RequestCell>
          </LeaderboardRow>
        ))}
      {requests.length === 0 && (
        <EmptyList style={{ height: "305px" }}>
          No outstanding friend requests
        </EmptyList>
      )}
    </RequestBoard>
    <LeaderboardEnd style={{ marginTop:"0px" }}>All Requests</LeaderboardEnd>
    </>
  );
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
`;

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
`;

const SearchBar = styled.input`
  spellCheck: false;
  autoCapitalize: none;
  autoCorrect: off;
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
`;

const SearchResultList = styled.div`
  height: fit-content;
  max-height: 40%;
  overflow-y: scroll;
  width: 20.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  position: absolute;
  top: 40%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 8px #bbb;
`;
const SearchResult = styled.div`
  height: 33%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

const UserInfoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: left;
  font-weight: bold;
  color: #000;
`;

const UserDP = styled.img`
  height: 30px;
  width: 30px;
  object-fit: contain;
  border-radius: 20px;
  background-color: #ececec;
`;

const SendRequestButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.disabled ? "#f5f5f5" : "#645df2")};
  color: ${(props) => (props.disabled ? "grey" : "#fff")};
  border-radius: 20px;
  height: 28px;
  width: fit-content;
  font-size: 14px;
  font-weight: bold;
  padding: 0px 10px;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  &:hover {
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.95)"};
  }
`;

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
`;

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
`;

const Leaderboard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(80% - 30px);
  max-height: calc(80% - 30px);
  margin: 0px auto;
`;

const RequestBoard = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 305px;
  max-height: 305px;
  margin: 0px auto;
`;

const LeaderboardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  font-size: 14px;
  color: ${(props) => (props.isCurrentUser ? "#645df2" : "#000")};
  border-bottom: 1px solid #7b7b7b;
`;

const LeaderboardStat = styled.div`
  font-weight: bold;
  color: #6d6d6d;
  padding: 4px 0px;
  border-bottom: 1px solid #7b7b7b;
`;

const LeaderboardCell = styled.div`
  font-weight: bold;
  padding: 10px 0px;
`;

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
`;

const RequestCell = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  padding: 8px 5px;
`;

const EmptyList = styled.div`
  min-height: 73%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  font-style: italic;
  font-size: 16px;
  border-bottom: 1px solid #7b7b7b;
`;

import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import formatCurrency from "../../utils/formatCurrency";

export default function LeaderboardModal({ setShowFullLeaderBoard, friends, setFriendModal, setCurrentFriendInfo, getName, currentUser }) {

    const closeLeaderboard = () => {
      setShowFullLeaderBoard(false);
    }

    return (
        <BackDrop onClick={closeLeaderboard}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Head>
                    <IoClose onClick={closeLeaderboard} className="h-8 w-8 cursor-pointer hover:brightness-50" />
                    <Title>Friends' Leaderboard</Title>
                </Head>
                <Row style={{ height: "30px" }}>
                    <HeadStat style={{ width: "15%" }}>Rank</HeadStat>
                    <HeadStat style={{ width: "15%" }}>Display Pig</HeadStat>
                    <HeadStat
                    style={{ width: "35%", textAlign: "left", paddingLeft: "5px", justifyContent:"start" }}
                    >
                    Fund
                    </HeadStat>
                    <HeadStat style={{ width: "20%" }}>PiggyBank</HeadStat>
                    <HeadStat style={{ width: "15%" }}>Total</HeadStat>
                </Row>
                <Body>
                    {friends.map((friend, index) => (
                        <Row
                            isCurrentUser={friend.username === currentUser.username}
                        >
                            <Cell style={{ width: "15%", }}>
                            {index + 1}
                            </Cell>
                            <Cell style={{ width: "15%" }}>
                                <DP srcSet={`images/${friend.displayPig}.png`} />
                            </Cell>
                            <Cell
                            style={{ width: "35%", textAlign: "left", paddingLeft: "10px", cursor:"pointer", justifyContent:"start" }}
                            onClick={() => {setFriendModal(true);setCurrentFriendInfo(friend);closeLeaderboard()}}
                            >
                            {getName(
                                friend.firstName,
                                friend.lastName,
                                friend.username === currentUser.username
                            )}
                            </Cell>
                            <Cell style={{ width: "20%", fontWeight: "normal" }}>
                            {formatCurrency(friend.bankBalance)}
                            </Cell>
                            <Cell style={{ width: "15%" }}>
                            {formatCurrency(friend.totalSaving)}
                            </Cell>
                        </Row>
                        ))}
                </Body>
            </Modal>
        </BackDrop>
    )
}

const BackDrop = styled.div`
    z-index: 10;
    position: fixed;
    top: 0;
    left: 20vw;
    width: 80vw;
    min-height: 100vh;
    max-height: 100vh;
    background-color: #00000080;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Modal = styled.div`
    width: 60%;
    min-height: 70vh;
    max-height: 90vh;
    background-color: #fff;
    border-radius: 30px;
    padding: 30px;
    color: #000;
`;

const Head = styled.div`
    width: 100%;
    min-height: 10%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-bottom: 10px;
`

const Title = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 20px;
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-height: 50vh;
    padding-bottom: 20px;
    overflow-y:scroll;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15%;
  font-size: 14px;
  color: ${(props) => (props.isCurrentUser ? "#645df2" : "#000")};
  border-bottom: 1px solid #7b7b7b;
`;

const HeadStat = styled.div`
  font-weight: bold;
  color: #6d6d6d;
  padding: 4px 0px;
  border-bottom: 1px solid #7b7b7b;
`;

const Cell = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
`;

const DP = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 30px;
    background-color: #ececec;
    object-fit: contain;
`

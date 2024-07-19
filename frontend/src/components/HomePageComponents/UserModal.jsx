import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import formatCurrency from "../../utils/formatCurrency";
const moment = require("moment");

export default function UserModal({ info, closeModal }) {
    return (
        <BackDrop onClick={closeModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Head>
                    <IoClose onClick={closeModal} className="h-8 w-8 cursor-pointer hover:brightness-50" />
                    <Title>{info.firstName} {info.lastName}'s Profile</Title>
                </Head>
                <Body>
                    <PigImage srcSet={`images/${info.displayPig}.png`} />
                    <InfoDiv>
                        <InfoCell>
                            <CellTitle>User ID: </CellTitle>
                            <CellValue>{info._id}</CellValue>
                        </InfoCell>
                        <InfoCell>
                            <CellTitle>Username: </CellTitle>
                            <CellValue>{info.username}</CellValue>
                        </InfoCell>
                        <InfoCell>
                            <CellTitle>Date Joined: </CellTitle>
                            <CellValue>{moment(info.dateCreated).format("DD MMMM YYYY")}</CellValue>
                        </InfoCell>
                        <InfoCell>
                            <CellTitle>Total Savings: </CellTitle>
                            <CellValue>{formatCurrency(info.totalSaving)}</CellValue>
                        </InfoCell>
                        <InfoCell>
                            <CellTitle>Monthly Income: </CellTitle>
                            <CellValue>{formatCurrency(info.income)}</CellValue>
                        </InfoCell>
                    </InfoDiv>
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
    width: 70%;
    min-height: 60vh;
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
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: 100%;
    padding: 20px 0px;
`

const PigImage = styled.img`
    width: 50%;
    height: 100%;
    object-fit: contain;
    background-color: #ececec;
    border-radius: 20px;
`

const InfoDiv = styled.div`
    width: 60%;
    height: 100%;
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
`

const InfoCell = styled.div`
    width: 100%;
    height: 20%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 20px;
    gap: 10px;
`

const CellTitle = styled.div`
    width: fit-content;
    text-align: left;
`

const CellValue = styled.div`
    width: fit-content;
    text-align: left;
    font-weight: bold;
`
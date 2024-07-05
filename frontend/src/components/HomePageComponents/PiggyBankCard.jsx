import React, { useEffect, useState } from "react";
import styled from "styled-components";
import formatCurrency from "../../utils/formatCurrency";

export default function PiggyBankCard({ bankBalance, currentTime, openContributeForm, closeContributeForm, activeGoals }) {
    var valid = bankBalance > 0 && activeGoals.length > 0;
    var statement = valid ? "":"(Insufficient funds or no active goals)";
    return (
        <>
            <PiggyContainer>
                <PiggyHead>Piggybank</PiggyHead>
                <PiggyBody>
                    <BankContainer>
                        <Balance>Fund Balance: <Statement>{statement}</Statement></Balance>
                        <Amount>{formatCurrency(bankBalance)}</Amount>
                    </BankContainer>
                </PiggyBody>
                <PiggyBottom>
                    <LastUpdated>Last updated {currentTime}</LastUpdated>
                    {valid && (<ContributeButton onClick={openContributeForm} activeGoals={activeGoals} bankBalance={bankBalance}>Allocate</ContributeButton>)}
                    {!valid && (<DisabledButton>Allocate</DisabledButton>)}
                </PiggyBottom>
            </PiggyContainer>
        </>
    )
}

const PiggyContainer = styled.div`
    margin-top: auto;
    width: 100%;
    height: 25vh;
    border-radius: 8px;
    box-shadow: 0px 0px 2px #bcbcbc;
    padding: 10px 20px;
    color: #000;
`

const PiggyHead = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px 10px;
  max-height: 35px;
  text-align: left;
  width: 100%;
  color: #000;
`;

const PiggyBody = styled.div`
    height: 60%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`

const BankContainer = styled.div`
    width: 100%;
    height: 100%;
`

const Balance = styled.div`
    font-size: 14px;
    text-align: left;
`

const Amount = styled.div`
    padding: 10px;
    font-size: 36px;
    font-weight: bold;
`

const LastUpdated = styled.div`
    font-size: 12px;
    font-style: italic;
    color: grey;
    text-align: left;
`

const PiggyBottom = styled.div`
    width: 100%;
    height: 30px;
    display:flex;
    align-items: center;
    justify-content: space-between;
`

const ContributeButton= styled.div`
    width: 85px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #645df2;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        filter: brightness(0.95);
    }
`

const DisabledButton= styled.div`
    width: 85px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cecece;
    color: #f1f1f1;
    font-size: 16px;
    font-weight: bold;
    cursor: default;
`

const Statement = styled.div`
    display: inline-block;
    font-size: 12px;
    color: grey;
`
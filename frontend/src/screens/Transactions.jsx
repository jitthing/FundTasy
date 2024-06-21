import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

export default function Transactions() {
    return (
        <PageContainer>
            <Navbar page="transactions" />
            <TransactionContainer>
                <Title>My Transactions</Title>
                
            </TransactionContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    padding: 25px;
`

const TransactionContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 100%;
    overflow: scroll;
`

const TransactionCard = styled.div`

`

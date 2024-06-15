import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

export default function Transactions() {
    return (
        <PageContainer>
            <Navbar page="transactions" />
            <div>My Transactions</div>
        </PageContainer>
    )
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

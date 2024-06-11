import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

export default function Settings() {
    return (
        <PageContainer>
            <Navbar page="settings" />
            <div>Settings</div>
        </PageContainer>
    )
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

export default function Settings() {
    function logout(){
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }
    return (
        <PageContainer>
            <Navbar page="settings" />
            <div>Settings</div>
            <button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={logout}>Logout</button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

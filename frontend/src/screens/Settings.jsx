import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

export default function Settings() {
    function handleChangePassword() {
        window.location.href = '/login?resetPassword=true';
    }

    function handleLogout() {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }

    return (
        <PageContainer>
            <NavbarContainer>
                <Navbar page="settings" />
            </NavbarContainer>
            <Content>
                <Title>Settings</Title>
                <Button onClick={handleChangePassword}>Change Password</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </Content>
        </PageContainer>
    );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 100%;
  height: 100vh;
  background-color: #f8f9fa;
`;

const NavbarContainer = styled.div`
  width: 20%;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  width: 80%;
  max-width: 600px;
  margin: auto;
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: block;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 20px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004080;
  }

  &:first-of-type {
    margin-top: 20px;
  }
`;

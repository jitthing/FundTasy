// import * as React from "react";
// import styled from "styled-components";
// import Navbar from "../components/Navbar";

// export default function Profile() {
//     return (
//         <PageContainer>
//             <Navbar page="profile" />
//             <div>My Profile</div>
//         </PageContainer>
//     )
// }

// const PageContainer = styled.div`
//   display: flex;
//   align-items: start;
//   margin: 0px;
//   padding: 0px;
// `;
import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

function Profile() {
  const [username, setUsername] = useState("fundtastypig");
  const [email, setEmail] = useState("fund@tasty.com");
  const [password, setPassword] = useState({ value: "actualPassword", masked: true });
  const [income, setIncome] = useState("10000");

  const handleEdit = (field, value) => {
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword({ value, masked: true });
    if (field === "income") setIncome(value);
  };

  const togglePasswordVisibility = () => {
    setPassword({ ...password, masked: !password.masked });
  };

  return (
    <PageContainer>
      <NavbarContainer>
        <Navbar page="profile" />
      </NavbarContainer>
      <ProfileContainer>
        <ProfilePicture>
          <img src="images/basic.png" alt="No Pig Selected" />
          <EditIcon src="icons/edit-black.png" alt="Edit" />
        </ProfilePicture>
        <ProfileInfo>
          <InfoRow>
            <Label>Username:</Label>
            <Value>{username}</Value>
            <EditIcon
              src="icons/edit-black.png"
              alt="Edit"
              onClick={() => handleEdit("username", prompt("Edit Username", username))}
            />
          </InfoRow>
          <InfoRow>
            <Label>Email:</Label>
            <Value>{email}</Value>
            <EditIcon
              src="icons/edit-black.png"
              alt="Edit"
              onClick={() => handleEdit("email", prompt("Edit Email", email))}
            />
          </InfoRow>
          <InfoRow>
            <Label>Password:</Label>
            <Value>{password.masked ? "*********" : password.value}</Value>
            <VisibilityToggle onClick={togglePasswordVisibility}>
              {password.masked ? "Show" : "Hide"}
            </VisibilityToggle>
            <EditIcon
              src="icons/edit-black.png"
              alt="Edit"
              onClick={() => handleEdit("password", prompt("Edit Password", password.value))}
            />
          </InfoRow>
          <InfoRow>
            <Label>Monthly Income:</Label>
            <Value>{income}</Value>
            <EditIcon
              src="icons/edit-black.png"
              alt="Edit"
              onClick={() => handleEdit("income", prompt("Edit Income", income))}
            />
          </InfoRow>
        </ProfileInfo>
      </ProfileContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0;
  padding: 0;
`;

const NavbarContainer = styled.div`
  flex: 0 0 200px; /* Adjust width as needed */
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  margin-left: 20px; /* Add space between navbar and profile details */
`;

const ProfilePicture = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ececec;
  img {
    width: 100%;
    height: 100%;
  }
  &:hover {
    cursor: pointer;
  }
`;

const EditIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 1;
  cursor: pointer;
  margin-left: 10px; /* Add space between value and icon */
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ececec;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
`;

const Value = styled.span`
  font-size: 18px;
  flex-grow: 1;
`;

const VisibilityToggle = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  color: #007bff;
`;

export default Profile;

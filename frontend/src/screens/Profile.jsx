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


/*
TODO 
 - Retrive user data from the backend 
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import axios from "axios";


function getToken() {
  return localStorage.getItem('authToken');
}

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [income, setIncome] = useState("Not set");
  const [showBanner, setShowBanner] = React.useState(false);
  const [bannerType, setBannerType] = React.useState("success"); // ["danger", "success", "info", "warning"]
  const [statusMessage, setStatusMessage] = React.useState("");

  function handleShowBanner() {
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 2000); // Hide the banner after 2s
  }
  const UpdateUserInfo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/update_user_info', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        income: income
      }, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (response.status === 200) {
        console.log("User info updated successfully");
        setStatusMessage(response.data.message);
        handleShowBanner();
      }
    }
    catch (error) {
      console.log("Error updating user data: ", error);
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user_info', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (response.status === 200) {
        setEmail(response.data.user.username);
        setIncome(response.data.user.income);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        // response.data.user.setLastName ? setLastName(response.data.user.lastName) : setLastName("Not set");
        // response.data.user.income ? setIncome(response.data.user.income) : setIncome("Not set");
        // console.log(response);
        console.log(response.data.message);
        setStatusMessage(response.data.message);
        console.log("workingregergreg");
        handleShowBanner();
      
      }
    }
    catch (error) {
      console.log("Error fetching user data: ", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // some bug here it's calling for updateUserInfo twice
    console.log(firstName, lastName, email, income);
    UpdateUserInfo();
  }, [firstName, lastName, email, income]);



  const handleEdit = (field, value) => {
    if (field === "fistname") setFirstName(value);
    if (field === "lastname") setLastName(value);
    if (field === "email") setEmail(value);
    if (field === "income") setIncome(value);
  };

  return (
    <PageContainer>
      {showBanner && <Banner type={bannerType}>{statusMessage}</Banner>}
      <Content>
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
              <Label>First name:</Label>
              <Value>{firstName}</Value>
              <EditIcon
                src="icons/edit-black.png"
                alt="Edit"
                onClick={() => handleEdit("fistname", prompt("Edit First name", firstName))}
              />
            </InfoRow>
            {
              lastName &&
              <InfoRow>
                <Label>Last name:</Label>
                <Value>{lastName}</Value>
                <EditIcon
                  src="icons/edit-black.png"
                  alt="Edit"
                  onClick={() => handleEdit("lastname", prompt("Edit Last name", lastName))}
                />
              </InfoRow>
            }

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
              <Label>Monthly Income:</Label>
              <Value>{income}</Value>
              <EditIcon
                src="icons/edit-black.png"
                alt="Edit"
                onClick={() => handleEdit("income", prompt("Edit Income", income))}
              />
            </InfoRow>
          </ProfileInfo>
          <button onClick={handleShowBanner}>Show Banner</button>
        </ProfileContainer>
      </Content>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
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
  object-fit: contain;
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

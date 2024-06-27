/*
TODO 
 - Fix text aligntment (not centered)
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import formatCurrency from "../utils/formatCurrency";
import getUser from "../utils/getUser";
import axios from "axios";


function getToken() {
  return localStorage.getItem('authToken');
}

function Profile() {
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [income, setIncome] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [showBanner, setShowBanner] = React.useState(false);
  const [bannerType, setBannerType] = React.useState("success"); // ["danger", "success", "info", "warning"]
  const [statusMessage, setStatusMessage] = React.useState(null);
  const [hasEdited, setHasEdited] = React.useState(false);

  function handleShowBanner() {
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 2000); // Hide the banner after 2s
  }
  const UpdateUserInfo = async () => {
    console.log("updating user data");
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
        setStatusMessage(response.data.message);
        setBannerType("success");
        handleShowBanner();
      }
    }
    catch (error) {
      console.log("Error updating user data: ", error);
      setStatusMessage(error.response.data.message);
      if (error.response.status === 400) setBannerType("warning");
      else setBannerType("danger");
      handleShowBanner();
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await getUser();
      console.log(response.user);
      setEmail(response.user.username);
      setFirstName(response.user.firstName);
      setLastName(response.user.lastName);
      response.user.lastName ? setLastName(response.user.lastName) : setLastName(undefined);
      response.user.income ? setIncome(response.user.income) : setIncome(undefined);
      setPassword(response.user.password); // use to check if user is a google user
      setStatusMessage(response.message);
      handleShowBanner();
    }
    catch (error) {
      setStatusMessage(error.message);
      setBannerType("danger");
      handleShowBanner();
    }
  };
  useEffect(() => {
    if (hasEdited) {
      UpdateUserInfo();
    }
  }, [firstName, lastName, email, income]);

  useEffect(() => {
    fetchUserData();
  }, []);


  const handleEdit = (field, value) => {
    if (!value) return; // if user cancels prompt
    setHasEdited(true);
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
              <Label>Email:</Label>
              <Value>{email}</Value>
              {password &&
                <EditIcon
                  src="icons/edit-black.png"
                  alt="Edit"
                  onClick={() => handleEdit("email", prompt("Edit Email", email))}
                />
              }
            </InfoRow>
            <InfoRow>
              <Label>First name:</Label>
              <Value>{firstName}</Value>
              <EditIcon
                src="icons/edit-black.png"
                alt="Edit"
                onClick={() => handleEdit("fistname", prompt("Edit First name", firstName))}
              />
            </InfoRow>

            <InfoRow>
              <Label>Last name:</Label>
              <Value>{lastName}</Value>
              <EditIcon
                src="icons/edit-black.png"
                alt="Edit"
                onClick={() => handleEdit("lastname", prompt("Edit Last name", lastName))}
              />
            </InfoRow>

            <InfoRow>
              <Label>Monthly Income:</Label>
              <Value>{formatCurrency(income)}</Value>
              <EditIcon
                src="icons/edit-black.png"
                alt="Edit"
                onClick={() => handleEdit("income", prompt("Edit Income: Please enter number", income))}
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

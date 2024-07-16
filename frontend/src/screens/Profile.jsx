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
  const [username, setUsername] = useState(undefined);
  const [showBanner, setShowBanner] = React.useState(false);
  const [bannerType, setBannerType] = React.useState("success"); // ["danger", "success", "info", "warning"]
  const [statusMessage, setStatusMessage] = React.useState(null);
  const [hasEdited, setHasEdited] = React.useState(false);
  const [displayPig, setdisplayPig] = useState("Basic");

  function handleShowBanner() {
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 2000); // Hide the banner after 2s
  }
  
  useEffect(() => {
    async function UpdateUserInfo() {
      console.log("updating user data");
      try {
        const response = await axios.post('http://localhost:8000/update_user_info', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          income: income,
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
    if (hasEdited) {
      UpdateUserInfo();
    }
  }, [firstName, lastName, email, income, hasEdited]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUser();
        console.log(response.user);
        setEmail(response.user.email);
        setFirstName(response.user.firstName);
        setLastName(response.user.lastName);
        setUsername(response.user.username);
        response.user.lastName ? setLastName(response.user.lastName) : setLastName(undefined);
        setIncome(response.user.income);
        setPassword(response.user.password); // use to check if user is a google user
        setdisplayPig(response.user.displayPig);
        setStatusMessage(response.message);
        handleShowBanner();
      }
      catch (error) {
        setStatusMessage(error.message);
        setBannerType("danger");
        handleShowBanner();
      }
    }
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
          <Head>My Profile</Head>
          <ProfileBody>
            <ProfilePicture>
              <img src={`images/${displayPig || 'basic'}.png`} alt="No Pig Selected" />
            </ProfilePicture>
            <ProfileInfo>
            <InfoRow>
                <Label>Username:</Label>
                <Value>{username}</Value>
                <Space />
              </InfoRow>

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
                <Space />
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

              <InfoRow>
                <Label>Display Pig:</Label>
                <Value>{displayPig.charAt(0).toUpperCase() + displayPig.slice(1)}</Value>
                <Space />
              </InfoRow>
            </ProfileInfo>
            {/* <button onClick={handleShowBanner}>Show Banner</button> */}
          </ProfileBody>
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
  width: 80vw;
  height: 100vh;
  padding: 30px; 
  align-items: start;
  justify-content: start;
`;

const Head = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  height: 10%;
  padding: 20px 0px;
`

const ProfileBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  height: 90%;
  padding: 30px;
`

const ProfilePicture = styled.div`
  position: relative;
  width: 500px;
  height: 400px;
  border-radius: 30px;
  overflow: hidden;
  background-color: #ececec;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    filter: brightness(0.9);
    transition: 0.2s;
    cursor: pointer;
  }
`;

const EditIcon = styled.img`
  width: 20%;
  height: 20px;
  opacity: 1;
  object-fit: contain;
  cursor: pointer;
  margin-left: auto; /* Add space between value and icon */
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ececec;
`;

const Label = styled.span`
  width: 20%;
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
  text-align: left;
`;

const Value = styled.span`
  width: 60%;
  font-size: 18px;
  flex-grow: 1;
`;

const Space = styled.div`
  width: 20%;
  height: 100%;
`

export default Profile;

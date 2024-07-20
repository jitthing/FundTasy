/*
TODO 
 - Fix text aligntment (not centered)
 */
 import React, { useState, useEffect, useRef } from "react";
 import styled from "styled-components";
 import Navbar from "../components/Navbar";
 import formatCurrency from "../utils/formatCurrency";
 import getUser from "../utils/getUser";
 import axios from "axios";
 import EditProfileModal from "../components/ProfileComponents/EditProfileForm";
 import Toastify from "toastify-js";
 
 
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
   const [statusMessage, setStatusMessage] = React.useState(null);
   const [hasEdited, setHasEdited] = React.useState(false);
   const [displayPig, setdisplayPig] = useState("Basic");
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const audioObjectRef = useRef(null);

  //for oink sound effect
  useEffect(() => {
    audioObjectRef.current = new Audio('audios/oink3.mp3');
  }, []);
    
  const handleMouseEnter = () => {
    if (audioObjectRef.current) {
      audioObjectRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  };
  
  const handleMouseLeave = () => {
    if (audioObjectRef.current) {
      audioObjectRef.current.pause();
      audioObjectRef.current.currentTime = 0;
    }
  };
   
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
           Toastify({
            text: statusMessage,
            duration: 2000,
            gravity: "top",
            position: "center",
            offset: {
              y: 10,
            },
            style: {
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#4bb543",
              color: "#fff",
              boxShadow: "0px 0px 4px #888888",
              width: "fit-content",
              height: "50px",
              position: "absolute",
              left: "calc(50vw - 50px)",
              borderRadius: "6px",
              padding: "10px 15px",
              textAlign: "center",
              zIndex: "100",
            },
          }).showToast();
         }
       }
       catch (error) {
         console.log("Error updating user data: ", error);
         setStatusMessage(error.response.data.message);
         Toastify({
          text: statusMessage,
          duration: 2000,
          gravity: "top",
          position: "center",
          offset: {
            y: 10,
          },
          style: {
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "red",
            color: "#fff",
            boxShadow: "0px 0px 4px #888888",
            width: "fit-content",
            height: "50px",
            position: "absolute",
            left: "calc(50vw - 50px)",
            borderRadius: "6px",
            padding: "10px 15px",
            textAlign: "center",
            zIndex: "100",
          },
        }).showToast();
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
       }
       catch (error) {
         Toastify({
          text: error.message,
          duration: 2000,
          gravity: "top",
          position: "center",
          offset: {
            y: 10,
          },
          style: {
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "red",
            color: "#fff",
            boxShadow: "0px 0px 4px #888888",
            width: "fit-content",
            height: "50px",
            position: "absolute",
            left: "calc(50vw - 50px)",
            borderRadius: "6px",
            padding: "10px 15px",
            textAlign: "center",
            zIndex: "100",
          },
        }).showToast();
       }
     }
     fetchUserData();
   }, []);
 
 
   const handleEdit = () => {
     setIsEditModalOpen(true);
   };
 
   const handleSaveEdit = async (updatedData) => {
     setHasEdited(true);
     setFirstName(updatedData.firstName);
     setLastName(updatedData.lastName);
     setEmail(updatedData.email);
     setIncome(updatedData.income);
   };


 
   return (
     <PageContainer>
       <Content>
         <NavbarContainer>
           <Navbar page="profile" />
         </NavbarContainer>
         <ProfileContainer>
           <Head>My Profile</Head>
           <EditButton onClick={() => handleEdit()}>
             Edit Profile
           </EditButton>
           <ProfileBody>
             <ProfilePicture
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
               >
               <img src={`images/${displayPig || 'basic'}.png`} alt="No Pig Selected" />
             </ProfilePicture>
             <ProfileInfo>
             <InfoRow>
                 <Label>Username:</Label>
                 <Value>{username}</Value>
               </InfoRow>
 
             <InfoRow>
                 <Label>Email:</Label>
                 <Value>{email}</Value>
               </InfoRow>
               <InfoRow>
                 <Label>First name:</Label>
                 <Value>{firstName}</Value>
               </InfoRow>
 
               <InfoRow>
                 <Label>Last name:</Label>
                 <Value>{lastName}</Value>
               </InfoRow>
 
               <InfoRow>
                 <Label>Monthly Income:</Label>
                 <Value>{formatCurrency(income)}</Value>
               </InfoRow>
 
               <InfoRow>
                 <Label>Display Pig:</Label>
                 <Value>{displayPig.charAt(0).toUpperCase() + displayPig.slice(1)}</Value>
               </InfoRow>
             </ProfileInfo>
           </ProfileBody>
         </ProfileContainer>
       </Content>
       {isEditModalOpen && (
         <EditProfileModal
           closeModal={() => setIsEditModalOpen(false)}
           userData={{ firstName, lastName, email, income }}
           onSave={handleSaveEdit}
         />
       )}
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
 
 const EditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  height: 30px;
  width: fit-content;
  padding: 0px 10px;
  background-color: #645df2;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  border: none;
  position: absolute;
  right: 200px;
  top: 100px; 
  &:hover {
    filter: brightness(0.9);
  }
`;
 
 export default Profile;
 
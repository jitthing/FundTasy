import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function EditProfileModal({ closeModal, userData, onSave }) {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [income, setIncome] = useState(userData.income);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ firstName, lastName, email, income });
    closeModal();
  };

  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHead>
            <CloseIcon src="icons/close.png" alt="Close" onClick={closeModal} />
            <ModalTitle>Edit Profile</ModalTitle>
          </ModalHead>
          <ModalBody>
            <FormBlock>
              <FormLabel>First Name</FormLabel>
              <FormTextInput
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </FormBlock>
            <FormBlock>
              <FormLabel>Last Name</FormLabel>
              <FormTextInput
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </FormBlock>
            <FormBlock>
              <FormLabel>Email</FormLabel>
              <FormTextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
              />
            </FormBlock>
            <FormBlock>
              <FormLabel>Monthly Income</FormLabel>
              <FormTextInput
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
                type="number"
              />
            </FormBlock>
          </ModalBody>
          <FormBottom>
            <FormSubmit type="submit">Save Changes</FormSubmit>
          </FormBottom>
        </form>
      </ModalContent>
    </ModalBackdrop>
  );
}

const ModalBackdrop = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 60%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
`;

const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseIcon = styled.img`
  height: 16px;
  width: 16px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.85);
  }
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FormLabel = styled.label`
  font-weight: bold;
  font-size: 16px;
`;

const FormTextInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ececec;
  &:focus {
    background-color: #fff;
    outline: 1px solid #cecece;
  }
`;

const FormBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const FormSubmit = styled.button`
  width: 120px;
  height: 40px;
  background-color: #645df2;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
`;

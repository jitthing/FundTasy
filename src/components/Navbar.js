import * as React from "react";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Div>
      <Div2>FundTasy</Div2>
      <Menu>
        <MenuItem>
          <MenuImg loading="lazy" srcSet="icons/home.png" />
          <MenuText>Home</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuImg loading="lazy" srcSet="icons/mypigs.png" />
          <MenuText>My Pigs</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuImg loading="lazy" srcSet="icons/wishlist.png" />
          <MenuText>Wishlist</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuImg loading="lazy" srcSet="icons/shop.png" />
          <MenuText>Shop</MenuText>
        </MenuItem>
      </Menu>
      <Info>
        <InfoItem>
          <InfoImg loading="lazy" srcSet="icons/profile.png" />
          <InfoText>Profile</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoImg loading="lazy" srcSet="icons/settings.png" />
          <InfoText>Settings</InfoText>
        </InfoItem>
      </Info>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  max-width: 320px;
  width: 15vw;
  height: 100vh;
  flex-direction: column;
  font-size: 24px;
  color: #7b7b7b;
  font-weight: 600;
  font: 700 32px Inter, sans-serif;
  margin: 0px;
  padding: 0px 30px;
  border-right: 1px solid #d9d9d9;
`;

const Div2 = styled.div`
  color: #000;
  font: 700 32px Inter, sans-serif;
  margin-top: 30px;
  padding-left: 10px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 80px;
`;

const MenuItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px 0px;
  white-space: nowrap;
  cursor: pointer;
`;

const MenuImg = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  height: 32px;
  width: 50px;
`;

const MenuText = styled.div`
  font-size: 24px;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: auto 0px 0px 0px;
  padding: 30px 0px;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 10px;
  white-space: nowrap;
  padding: 5px 0px;
`;

const InfoImg = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  height: 24px;
  width: 50px;
`;

const InfoText = styled.div`
  font-size: 20px;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
`;

import * as React from "react";
import styled from "styled-components";

export default function Navbar(props) {
  const { page } = props;
  
  return (
    <Div>
      <Div2>FundTasy</Div2>
      <Menu>
        <MenuItem>
          <MenuImg srcSet="icons/home.png" style={{ opacity: page==="home" ? 1:0.5 }} />
          <MenuText style={{ color: page==="home" ? "#000":"#7b7b7b" }} >Home</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuImg srcSet="icons/mypigs.png" style={{ opacity: page==="mypigs" ? 1:0.5 }} />
          <MenuText style={{ color: page==="mypigs" ? "#000":"#7b7b7b" }} >My Pigs</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuImg srcSet="icons/wishlist.png" style={{ opacity: page==="wishlist" ? 1:0.5 }} />
          <MenuText style={{ color: page==="wishlist" ? "#000":"#7b7b7b" }} >Wishlist</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuImg srcSet="icons/shop.png" style={{ opacity: page==="shop" ? 1:0.5 }} />
          <MenuText style={{ color: page==="shop" ? "#000":"#7b7b7b" }} >Shop</MenuText>
        </MenuItem>
      </Menu>
      <Info>
        <InfoItem>
          <InfoImg srcSet="icons/profile.png" style={{ opacity: page==="profile" ? 1:0.5 }} />
          <InfoText style={{ color: page==="profile" ? "#000":"#7b7b7b" }} >Profile</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoImg srcSet="icons/settings.png" style={{ opacity: page==="settings" ? 1:0.5 }} />
          <InfoText style={{ color: page==="settings" ? "#000":"#7b7b7b" }} >Settings</InfoText>
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

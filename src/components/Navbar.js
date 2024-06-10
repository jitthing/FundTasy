import * as React from "react";
import css from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const { page } = props;

  const navigate = useNavigate();

  return (
    <Div>
      <Div2>FundTasy</Div2>
      <Menu>
        <MenuItem onClick={() => navigate("/home")} >
          <MenuImg srcSet="icons/home.png" active={page === "home"} />
          <MenuText active={page === "home"} >Home</MenuText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/my-pigs")} >
          <MenuImg srcSet="icons/mypigs.png" active={page === "mypigs"} />
          <MenuText active={page === "mypigs"} >My Pigs</MenuText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/wishlist")} >
          <MenuImg srcSet="icons/wishlist.png" active={page === "wishlist"} />
          <MenuText active={page === "wishlist"} >Wishlist</MenuText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/shop")} >
          <MenuImg srcSet="icons/shop.png" active={page === "shop"} />
          <MenuText active={page === "shop"} >Shop</MenuText>
        </MenuItem>
      </Menu>
      <Info>
        <InfoItem onClick={() => navigate("/profile")} >
          <InfoImg srcSet="icons/profile.png" active={page === "profile"} />
          <InfoText active={page === "profile"} >Profile</InfoText>
        </InfoItem>
        <InfoItem onClick={() => navigate("/settings")} >
          <InfoImg srcSet="icons/settings.png" active={page === "settings"} />
          <InfoText active={page === "settings"} >Settings</InfoText>
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
  ${MenuItem}:hover & {
    opacity: 0.7;
  }
  opacity: ${(props) => props.active ? 1:0.5}
`;

const MenuText = styled.div`
  font-size: 24px;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  color: ${(props) => props.active ? "#000":"#7b7b7b"};
  ${MenuItem}:hover & {
    filter: brightness(0.7);
  }
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
  cursor: pointer;
`;

const InfoImg = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  height: 24px;
  width: 50px;
  ${InfoItem}:hover & {
    opacity: 0.7;
  }
  opacity: ${(props) => props.active ? 1:0.5}
`;

const InfoText = styled.div`
  font-size: 20px;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  color: ${(props) => props.active ? "#000":"#7b7b7b"}
  ${InfoItem}:hover & {
    filter: brightness(0.7);
  }
`;

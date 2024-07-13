import axios from "axios";
import styled from "styled-components";
import Toastify from "toastify-js";
import formatCurrency from "../../utils/formatCurrency";

export const SearchResult = ({ result, updateWishlist, username }) => {
  const handleClick = async (result) => {
    try {
      const body = { ...result, username: username };
      const response = await axios.post(
        "http://localhost:8000/add_wishlist_item",
        body
      );
      // console.log(body);
      updateWishlist();
      Toastify({
        text: `${response.data.message}!`,
        duration: 2000,
        gravity: "top",
        position: "center",
        offset: {
          y: 10 
        },
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "#4bb543",
          color: "#fff",
          boxShadow: "0px 0px 4px #888888",
          width: "360px",
          height: "48px",
          position: "absolute",
          left: "calc(50vw - 50px)",
          borderRadius: "6px",
          padding: "10px",
          textAlign: "center",
          zIndex: "100"
        }
      }).showToast();
    } catch (error) {
      Toastify({
        text: "Item already in wishlist!",
        duration: 2000,
        gravity: "top",
        position: "center",
        offset: {
          y: 10 
        },
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "red",
          color: "#fff",
          boxShadow: "0px 0px 4px #888888",
          width: "250px",
          height: "48px",
          position: "absolute",
          left: "calc(50vw - 50px)",
          borderRadius: "6px",
          padding: "10px",
          textAlign: "center",
          zIndex: "100"
        }
      }).showToast();
    }
  };
  return (
    <SearchResultWrapper onClick={() => handleClick(result)}>
      <img alt="" src={result.image} width="40" height="20" />
      <InfoWrapper>
        {result.title}
        <br></br>
        <b>{formatCurrency(result.price)}</b>
      </InfoWrapper>
    </SearchResultWrapper>
  );
};

const SearchResultWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  // flex-direction: row;
  // justify-content: center;
  &:hover {
    background-color: #efefef;
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  width: 100%;
`;

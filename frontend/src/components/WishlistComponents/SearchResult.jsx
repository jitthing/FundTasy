import axios from "axios";
import styled from "styled-components";

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
      alert(`${response.data.message}`);
    } catch (error) {
      alert("Item already in wishlist!");
    }
  };
  return (
    <SearchResultWrapper onClick={() => handleClick(result)}>
      <img alt="" src={result.image} width="40" height="20" />
      <InfoWrapper>
        {result.title}
        <br></br>
        <b>${result.price}</b>
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

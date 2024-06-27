import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import getUser from "../utils/getUser";
import getWishlist from "../utils/getWishlist";


import { SearchBar } from "../components/WishlistComponents/SearchBar";
import { SearchResults } from "../components/WishlistComponents/SearchResults";
import { AddedItems } from "../components/WishlistComponents/AddedItems";

export default function Wishlist() {
  const [results, setResults] = useState([]);

  const [items, setItems] = useState([]);

  const [wishlistUpdate, setUpdate] = useState(false);

  const [userId, setUserId] = useState("");
  
  

  useEffect(() => {
    async function getUser() {
      try {
        const response = await getUser();
        setUserId(response.user._id); //Changed it ._id cause user can change their username "email"
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getWishlist(userId);
        setItems(response);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchWishlist();
  }, [wishlistUpdate, userId]);

  const handleWishlistUpdate = () => {
    setUpdate(!wishlistUpdate);
  };

  return (
    <PageContainer>
      <Navbar page="wishlist" />
      <SearchAndItemsWrapper>
        <SearchWrapper>
          <SearchBar setResults={setResults} />
          {results && (
            <SearchResults
              results={results}
              updateWishlist={handleWishlistUpdate}
              UserId={userId}
            />
          )}
        </SearchWrapper>
        <WishlistItemHeader>Wishlist Items</WishlistItemHeader>
        <AddedItems items={items} />
      </SearchAndItemsWrapper>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

const SearchWrapper = styled.div`
  padding-top: 7vh;
  padding-left: 7vh;
  min-width: 80%;
  max-width: 85%;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const WishlistItemHeader = styled.div`
  padding-top: 6vh;
  padding-bottom: 4vh;
  font-size: 20px;
`;

const SearchAndItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100vh;
  font-family: Inter, sans-serif;
  width: 100%;
`;

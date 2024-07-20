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

  const [username, setUsername] = useState("");

  const [displayResults, setDisplayResults] = useState(false);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const userResponse = await getUser();
        setUsername(userResponse.user.username);
        const wishlistResponse = await getWishlist();
        setItems(wishlistResponse.items);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchWishlist();
  }, [wishlistUpdate]);

  const handleWishlistUpdate = () => {
    setUpdate(!wishlistUpdate);
  };

  const closeResults = () => {
    setDisplayResults(false);
  }

  return (
    <PageContainer>
      <Navbar page="wishlist" />
      <SearchAndItemsWrapper onClick={closeResults}>
        <WishlistHead>My Wishlist</WishlistHead>
        <SearchWrapper>
          <SearchBar setResults={setResults} setDisplayResults={setDisplayResults} />
          {results && displayResults && (
            <SearchResults
              results={results}
              updateWishlist={handleWishlistUpdate}
              username={username}
            />
          )}
        </SearchWrapper>
        <AddedItems items={items} updateWishlist={handleWishlistUpdate} />
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

const WishlistHead = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  height: 10%;
  padding: 20px 0px;
`

const SearchWrapper = styled.div`
  width: 80%;
  max-width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
`;

const SearchAndItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: scroll;
  height: 100vh;
  font-family: Inter, sans-serif;
  width: 80vw;
  overflow: hidden;
`;

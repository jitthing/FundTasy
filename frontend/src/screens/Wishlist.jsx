import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

import { SearchBar } from "../components/WishlistComponents/SearchBar";
import { SearchResults } from "../components/WishlistComponents/SearchResults";
import { AddedItems } from "../components/WishlistComponents/AddedItems";

export default function Wishlist() {
  const [results, setResults] = useState([]);

  const [items, setItems] = useState([]);

  const [wishlistUpdate, setUpdate] = useState(false);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function getUserId() {
      try {
        const getToken = () => {
          return localStorage.getItem("authToken");
        };
        const token = getToken();
        const response = await axios.get("http://localhost:8000/user_info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data.user.username);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    getUserId();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:8000/all_wishlist_items",
          { username: userId }
        );
        const data = await response.data;
        // console.log(data);
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
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

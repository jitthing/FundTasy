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

  const handleWishlistUpdate = () => {
    setUpdate(!wishlistUpdate);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:8000/all_wishlist_items"
        );
        const data = await response.data;
        // console.log(data);
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, [wishlistUpdate]);

  return (
    <PageContainer>
      <Navbar page="wishlist" />
      <SearchWrapper>
        <SearchBar setResults={setResults} />
        {results && (
          <SearchResults
            results={results}
            updateWishlist={handleWishlistUpdate}
          />
        )}
        <AddedItems items={items} />
      </SearchWrapper>
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
  width: 50%;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

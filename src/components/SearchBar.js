import React, { useState, useEffect, useReducer } from "react";
import "./SearchBar.css";
import { initialState, SearchBarReducer } from "../reducers/SearchBarReducer";

const axios = require("axios");

function SearchBar({ setIsSearching, setResult }) {
  const [searchState, dispatch] = useReducer(SearchBarReducer, initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    async function getArtistData(url, _dispatch) {
      try {
        const response = await axios.get(url);
        dispatch({ type: "artistSearch", payload: response.data });
      } catch (error) {
        console.error(error);
      }
    }

    if (isSubmitted) {
      let artistSearchURL = `https://theaudiodb.com/api/v1/json/523532/search.php?s=${searchState.query}`;
      getArtistData(artistSearchURL, dispatch);
    }
  }, [isSubmitted]);

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder={"Search Artist 'Stevie Wonder'"}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            setIsSubmitted(true);
          }
        }}
        onChange={(e) => {
          dispatch({ type: "setQuery", payload: e.target.value });
          //   if (searchState.query && searchState.query.length >= 7) {
          //     setIsSubmitted(true);
          //   }
        }}
      />
    </div>
  );
}

export default SearchBar;

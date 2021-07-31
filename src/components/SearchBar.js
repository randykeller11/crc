import React, { useState, useEffect, useReducer } from "react";
import "./SearchBar.css";
import SearchBarDropDown from "./SearchBarDropDown";
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
        _dispatch({
          type: "update",
          payload: {
            location: "artistResults",
            updateValue: response.data.artists,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (isSubmitted) {
      let artistSearchURL = `https://theaudiodb.com/api/v1/json/523532/search.php?s=${searchState.query}`;
      getArtistData(artistSearchURL, dispatch);
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (searchState.query === "") {
      dispatch({
        type: "update",
        payload: { location: "query", updateValue: null },
      });
      dispatch({
        type: "update",
        payload: { location: "artistResults", updateValue: null },
      });
    }
  }, [searchState]);

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder={"Search Artist 'Stevie Wonder'"}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            setIsSubmitted(false);
            if (searchState.query) {
              setIsSubmitted(true);
            } else {
              dispatch({
                type: "update",
                payload: { location: "query", updateValue: null },
              });
            }
          }
        }}
        onChange={(e) => {
          dispatch({
            type: "update",
            payload: { location: "query", updateValue: e.target.value },
          });
          setIsSubmitted(false);
          //   dispatch({
          //     type: "update",
          //     payload: { location: "artistURL", updateValue: null },
          //   });

          if (searchState.query && searchState.query.length >= 7) {
            setIsSubmitted(true);
          }
        }}
      />
      {searchState.artistResults &&
        searchState.artistResults.map((result, i) => {
          return (
            <SearchBarDropDown
              _isAlbumSearch={false}
              _index={i}
              dispatch={dispatch}
              displayValue={result}
              artistURL={searchState.artistURL}
            />
          );
        })}
    </div>
  );
}

export default SearchBar;

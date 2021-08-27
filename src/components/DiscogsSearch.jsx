import React, { useState, useEffect, useReducer } from "react";
import {
  initialState,
  DiscogsSearchReducer,
} from "../reducers/DiscogsSearchReducer";
import { getSearchData } from "./helperFunctions";
import "./DiscogsSearch.css";
import SearchBarDropDown from "./SearchBarDropDown";

function DiscogsSearch({ setIsSearching, setResult }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchState, dispatch] = useReducer(
    DiscogsSearchReducer,
    initialState
  );

  useEffect(() => {
    if (isSubmitted) {
      searchState.searchType === 0 &&
        getSearchData(
          `https://api.discogs.com/database/search?release_title=${searchState.query}&type=master`,
          dispatch,
          "albumResults"
        );

      isSubmitted &&
        searchState.searchType === 1 &&
        getSearchData(
          `https://api.discogs.com/database/search?catno=${searchState.query}&type=master`,
          dispatch,
          "albumResults"
        );
    }

    setIsSubmitted(false);
  }, [isSubmitted]);

  return (
    <div className="searchBar">
      <input
        type="text"
        value={searchState.query}
        onChange={(e) => {
          dispatch({
            type: "update",
            payload: { location: "query", updateValue: e.target.value },
          });
        }}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            dispatch({
              type: "update",
              payload: { location: "albumResults", updateValue: null },
            });
            setIsSubmitted(true);
          }
        }}
      />
      <div className="searchBar__options">
        <div
          className={
            searchState.searchType === 0
              ? "searchBar__optionActive"
              : "searchBar__option"
          }
          onClick={() => {
            dispatch({
              type: "update",
              payload: { location: "searchType", updateValue: 0 },
            });
          }}
        >
          <h3>Album</h3>
        </div>

        <div
          className={
            searchState.searchType === 1
              ? "searchBar__optionActive"
              : "searchBar__option"
          }
          onClick={() => {
            dispatch({
              type: "update",
              payload: { location: "searchType", updateValue: 1 },
            });
          }}
        >
          <h3>Cat #</h3>
        </div>
      </div>

      {searchState.albumResults &&
        searchState.albumResults.results.map((album, i) => (
          <SearchBarDropDown
            _isAlbumSearch={true}
            dispatch={dispatch}
            displayValue={album}
            setIsSearching={setIsSearching}
            setResult={setResult}
            fullValue={{
              searchType: searchState.searchType,
              query: searchState.query,
              value: album,
            }}
          />
        ))}
    </div>
  );
}

export default DiscogsSearch;

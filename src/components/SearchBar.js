import React, { useState, useEffect, useReducer } from "react";
import "./SearchBar.css";
import SearchBarDropDown from "./SearchBarDropDown";
import { initialState, SearchBarReducer } from "../reducers/SearchBarReducer";
import { getSearchData } from "./helperFunctions";

function SearchBar({ setIsSearching, setResult }) {
  const [searchState, dispatch] = useReducer(SearchBarReducer, initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      dispatch({
        type: "update",
        payload: { location: "albumResults", updateValue: null },
      });
      let artistSearchURL = `https://theaudiodb.com/api/v1/json/523532/search.php?s=${searchState.query}`;
      getSearchData(artistSearchURL, dispatch, "artistResults");
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (searchState.query === "" || searchState.query === null) {
      dispatch({
        type: "update",
        payload: { location: "query", updateValue: null },
      });
      dispatch({
        type: "update",
        payload: { location: "artistResults", updateValue: null },
      });
      dispatch({
        type: "update",
        payload: { location: "artistURL", updateValue: null },
      });
    }
  }, [searchState.query]);

  useEffect(() => {
    if (searchState.artistURL) {
      let updatedArray = searchState.artistResults.artists.filter(
        (artist) => artist.idArtist === searchState.artistURL
      );
      dispatch({
        type: "update",
        payload: {
          location: "artistResults",
          updateValue: { artists: updatedArray },
        },
      });
      let albumSearchURL = `https://theaudiodb.com/api/v1/json/523532/album.php?i=${searchState.artistURL}`;
      //   console.log(albumSearchURL);
      getSearchData(albumSearchURL, dispatch, "albumResults");
    }
  }, [searchState.artistURL]);

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
            payload: { location: "albumResults", updateValue: null },
          });
          dispatch({
            type: "update",
            payload: { location: "query", updateValue: e.target.value },
          });
          dispatch({
            type: "update",
            payload: { location: "artistURL", updateValue: null },
          });
          setIsSubmitted(false);

          if (searchState.query && searchState.query.length >= 7) {
            setIsSubmitted(true);
          }
        }}
      />
      {searchState.artistResults &&
        searchState.artistResults.artists &&
        searchState.artistResults.artists.map((result, i) => {
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
      {searchState.albumResults && (
        <div className="albumSearch__container">
          {searchState.albumResults.album.map((album, i) => {
            return (
              <SearchBarDropDown
                _isAlbumSearch={true}
                _index={i}
                dispatch={dispatch}
                displayValue={album}
                artistURL={null}
                setIsSearching={setIsSearching}
                setResult={setResult}
                componentType={0}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

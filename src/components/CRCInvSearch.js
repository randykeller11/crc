import React, { useState, useEffect, useReducer } from "react";
import "./CRCInvSearch.css";
import SearchBarDropDown from "./SearchBarDropDown";
import {
  initialState,
  CRCInvSearchReducer,
} from "../reducers/CRCInvSearchReducer";
import db from "../config/firebase";

function CRCInvSearch({ setIsSearching, setResult }) {
  const [searchState, dispatch] = useReducer(CRCInvSearchReducer, initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //on submit use effect that gets artist results
  useEffect(() => {
    const getAlbumPageData = async (_dataLocation) => {
      let searchData = await db
        .collection("albumPages")
        .where(_dataLocation, "==", searchState.query.toLowerCase())
        .get();
      if (!searchData.empty) {
        let localArray = [];
        searchData.forEach((_albumPageDoc) => {
          localArray.push(_albumPageDoc.data());
        });
        dispatch({
          type: "update",
          payload: { location: "albumResults", updateValue: localArray },
        });
      }
    };

    if (isSubmitted) {
      dispatch({
        type: "update",
        payload: { location: "albumResults", updateValue: null },
      });
      if (searchState.searchType === 0) {
        getAlbumPageData("albumTitle");
      } else if (searchState.searchType === 1) {
        getAlbumPageData("artist");
      }
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  //use effect to clear search data when there is no query
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

  //useEffect to set artist results to the artist the user clicked
  //then search for album with that artists url
  //   useEffect(() => {
  //     if (searchState.artistURL) {
  //       let updatedArray = searchState.artistResults.artists.filter(
  //         (artist) => artist.idArtist === searchState.artistURL
  //       );
  //       dispatch({
  //         type: "update",
  //         payload: {
  //           location: "artistResults",
  //           updateValue: { artists: updatedArray },
  //         },
  //       });
  //       let albumSearchURL = `https://theaudiodb.com/api/v1/json/523532/album.php?i=${searchState.artistURL}`;
  //       //   console.log(albumSearchURL);
  //       getSearchData(albumSearchURL, dispatch, "albumResults");
  //     }
  //   }, [searchState.artistURL]);

  //jsx return input with onKeyPress handler for when user clicks enter
  //also an on change handler update the query everytime
  //display a searchbar drop down for artist results
  //display a searchbar drop down for album results
  return (
    <div className="searchBar">
      <div className="searchBar__top">
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
        <div
          className={
            searchState.searchType === 0
              ? "searchBar__top__optionActive"
              : "searchBar__top__option"
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
              ? "searchBar__top__optionActive"
              : "searchBar__top__option"
          }
          onClick={() => {
            dispatch({
              type: "update",
              payload: { location: "searchType", updateValue: 1 },
            });
          }}
        >
          <h3>Artist</h3>
        </div>
      </div>
      {searchState.albumResults && (
        <div className="albumSearch__container">
          {searchState.albumResults.map((album, i) => {
            return (
              <SearchBarDropDown
                _isAlbumSearch={true}
                _index={i}
                dispatch={dispatch}
                fullValue={album}
                displayValue={album.albumInfo}
                artistURL={null}
                setIsSearching={setIsSearching}
                setResult={setResult}
                componentType={1}
              />
            );
          })}
        </div>
      )}

      {/* {searchState.artistResults &&
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
              />
            );
          })}
        </div>
      )} */}
    </div>
  );
}

export default CRCInvSearch;

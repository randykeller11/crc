import React, { useState, useEffect, useRef } from "react";
import db from "../config/firebase";
import AlbumSearch from "./AlbumSearch";
import {
  getData,
  writeToDb,
  initialPlaceholders,
  addPlaceholders,
} from "./helperFunctions";
import "./WatchlistDisplay.css";
import WatchlistRow from "./WatchlistRow";

function WatchlistDisplay({ _initValue, _isTopFive }) {
  const [payload, setPayload] = useState(null);
  const [localWatchlist, setLocalWatchlist] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTarget, setSearchTarget] = useState(null);
  const [localStateAlbums, setLocalStateAlbums] = useState(null);

  const managePlaceHolders = (_usePlaceholders, _array) => {
    if (_usePlaceholders) {
      let placeHolderArray = addPlaceholders(_array, _isTopFive);
      setLocalWatchlist(placeHolderArray);
    } else {
      let noPlaceHolderArray = localWatchlist.filter(
        (album) => album.value != 0
      );
      setLocalStateAlbums(noPlaceHolderArray.length);
      setLocalWatchlist(noPlaceHolderArray);
    }
  };
  //--------------------build board from initial data-------------------------------
  useEffect(() => {
    if (_isTopFive) {
      setLocalStateAlbums(_initValue.length);
      let placeHolderArray = initialPlaceholders(_initValue, _isTopFive);
      setLocalWatchlist(placeHolderArray);
    } else {
      console.log("time to build second tier board");
      setLocalStateAlbums(_initValue.length);
      let placeHolderArray = initialPlaceholders(_initValue);
      setLocalWatchlist(placeHolderArray);
    }
  }, []);

  //---------------------useEffect for when user clicks album------------------------
  useEffect(() => {
    if (searchTarget) {
      managePlaceHolders(false);
      setIsSearching(true);
    }
  }, [searchTarget]);

  useEffect(() => {
    if (!isSearching && searchTarget) {
      managePlaceHolders(true, localWatchlist);
      console.log("time to fix the bug");
    }
  }, [isSearching]);

  //----------------------functions to build elements---------------------------

  const makeRows = () => {
    let localArray = [];
    for (let i = 0; i < 3; i++) {
      let targetAlbums = localWatchlist.filter((album) => album.row === i);
      localArray.push({ id: i, albums: targetAlbums });
    }
    return localArray.map((row) => {
      return (
        <WatchlistRow albums={row.albums} setSearchTarget={setSearchTarget} />
      );
    });
  };

  //------------------primary watchlist component------------------

  return (
    <div>
      {/* <button onClick={handleClick}>{editMode ? "confirm" : "edit"}</button> */}
      {!isSearching && (
        <div className="watchlist">
          <div className="watchlist__header">
            <h1>{_isTopFive ? "Top Five" : "Second Tier"}</h1>
          </div>
          {localWatchlist &&
            !_isTopFive &&
            localWatchlist.length === 15 &&
            makeRows()}
          {localWatchlist && _isTopFive && localWatchlist.length === 5 && (
            <WatchlistRow
              albums={localWatchlist}
              setSearchTarget={setSearchTarget}
            />
          )}
        </div>
      )}
      {isSearching && localWatchlist.length === localStateAlbums && (
        <div className="watchlist__search">
          <AlbumSearch
            _albumList={localWatchlist}
            _setAlbumList={setLocalWatchlist}
            _setIsAddingAlbum={setIsSearching}
          />
        </div>
      )}
    </div>
  );
}
export default WatchlistDisplay;

//write payload to db dynamically
// useEffect(() => {
//   if (payload) {
//     writeToDb("watchlists", payload, userData.id);
//     setPayload(null);
//   }
// }, [payload]);

// const testButton = (
//   <button
//     onClick={() => {
//       setIsSearching(true);
//       setPayload({ emoji: "🍩", testPhrase: "donut" });
//     }}
//   >
//     edit
//   </button>
// );

import React, { useState, useEffect, useRef } from "react";
import { useFirestoreData } from "../hooks/useFirestoreData";
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

function WatchlistDisplay({ _init }) {
  const userData = useFirestoreData("users");
  const [payload, setPayload] = useState(null);
  const [dbWatchlist, setDbWatchlist] = useState(null);
  const [localWatchlist, setLocalWatchlist] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTarget, setSearchTarget] = useState(null);
  const [localStateAlbums, setLocalStateAlbums] = useState(null);

  useEffect(() => {
    if (userData) {
      getData("watchlists", userData.id, setDbWatchlist);
    }
  }, [userData]);

  const managePlaceHolders = (_usePlaceholders, _array) => {
    if (_usePlaceholders) {
      let placeHolderArray = addPlaceholders(_array);
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
    if (dbWatchlist) {
      setLocalStateAlbums(dbWatchlist.secondTier.length);
      let placeHolderArray = initialPlaceholders(dbWatchlist.secondTier);
      setLocalWatchlist(placeHolderArray);
      setDbWatchlist(null);
    }
  }, [dbWatchlist]);

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

  const handleClick = () => {
    // setIsSearching(true);
    // setEditMode(1);
  };

  //------------------primary watchlist component------------------

  if (userData) {
    return (
      <div>
        <button onClick={handleClick}>{editMode ? "confirm" : "edit"}</button>
        {!isSearching && (
          <div className="watchlist">
            <div className="watchlist__header">
              <h1>My Watchlist</h1>
            </div>
            {localWatchlist && localWatchlist.length === 15 && makeRows()}
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
  //-----------loading page until user data is loaded-------------
  return <h1>loading watchlist...</h1>;
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

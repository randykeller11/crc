import React, { useState, useEffect, useRef } from "react";
import { useFirestoreData } from "../hooks/useFirestoreData";
import db from "../config/firebase";
import AlbumSearch from "./AlbumSearch";
import { getData, writeToDb, buildWatchlistDisplay } from "./helperFunctions";
import "./Watchlist.css";
import WatchlistRow from "./WatchlistRow";

function Watchlist() {
  const userData = useFirestoreData("users");
  const [payload, setPayload] = useState(null);
  const [dbWatchlist, setDbWatchlist] = useState(null);
  const [localWatchlist, setLocalWatchlist] = useState(null);
  const [displayMap, setDisplayMap] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTarget, setSearchTarget] = useState(null);
  const [renderSearch, setRenderSearch] = useState(false);
  const localStateAlbums = useRef();

  useEffect(() => {
    if (userData) {
      getData("watchlists", userData.id, setDbWatchlist);
    }
  }, [userData]);

  const managePlaceHolders = (_usePlaceholders) => {
    if (_usePlaceholders) {
      let placeHolderArray = buildWatchlistDisplay(dbWatchlist.watchlist);
      setLocalWatchlist(placeHolderArray);
    } else {
      let noPlaceHolderArray = localWatchlist.filter(
        (album) => album.value != 0
      );
      localStateAlbums.current = setLocalWatchlist(noPlaceHolderArray);
    }
  };

  useEffect(() => {
    if (dbWatchlist) {
      localStateAlbums.current = dbWatchlist.watchlist.length;
      managePlaceHolders(true);
      setDbWatchlist(null);
    }
  }, [dbWatchlist]);

  //----------------------functions to build elements---------------------------

  const makeRows = () => {
    let localArray = [];
    for (let i = 0; i < 4; i++) {
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

  const handleClick = () => {
    // setIsSearching(true);
    // setEditMode(1);
  };
  if (userData) {
    return (
      <div>
        <button onClick={handleClick}>
          {editMode === 1 ? "confirm" : "edit"}
        </button>
        {!isSearching && (
          <div className="watchlist">
            <div className="watchlist__header">
              <h1>My Watchlist</h1>
            </div>
            {localWatchlist && localWatchlist.length === 20 && makeRows()}
          </div>
        )}
        {renderSearch && localWatchlist.length < 20 && (
          <div className="watchlist__search">
            <AlbumSearch
              _albumList={dbWatchlist}
              _setAlbumList={setDbWatchlist}
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
export default Watchlist;

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

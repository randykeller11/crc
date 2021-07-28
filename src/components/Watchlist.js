import React, { useState, useEffect } from "react";
import { useFirestoreData } from "../hooks/useFirestoreData";
import db from "../config/firebase";
import AlbumSearch from "./AlbumSearch";
import { getData, writeToDb } from "./helperFunctions";
import "./Watchlist.css";
import WatchlistAlbum from "./WatchlistAlbum";

function Watchlist() {
  const userData = useFirestoreData("users");
  const [payload, setPayload] = useState(null);
  const [dbWatchlist, setDbWatchlist] = useState(null);
  const [localWatchlist, setLocalWatchlist] = useState(null);
  const [watchlistDisplay, setWatchlistDisplay] = useState([
    { rowNum: 0, albums: [] },
    { rowNum: 1, albums: [] },
    { rowNum: 2, albums: [] },
    { rowNum: 3, albums: [] },
  ]);

  const [isSearching, setIsSearching] = useState(false);
  const [editMode, setEditMode] = useState(0);

  useEffect(() => {
    if (userData) {
      getData("watchlists", userData.id, setDbWatchlist);
    }
  }, [userData]);

  const buildWatchlistDisplay = (_array) => {
    let localArray = [];
    console.log(_array.length);
    for (let i = 0; i < 20; i++) {
      if (i < _array.length) {
        localArray.push(_array[i]);
      } else {
        localArray.push(0);
      }
    }
    return localArray;
  };

  useEffect(() => {
    if (dbWatchlist) {
      console.log(dbWatchlist.watchlist);
      let testDisplay = buildWatchlistDisplay(dbWatchlist.watchlist);
      setLocalWatchlist(testDisplay);
    }
  }, [dbWatchlist]);

  //------------------primary watchlist component------------------
  const handleClick = () => {
    setIsSearching(true);
    setEditMode(1);
  };

  if (userData) {
    return (
      <div className="watchlist">
        <button onClick={handleClick}>
          {editMode === 1 ? "confirm" : "edit"}
        </button>
        {!isSearching && (
          <div className="watchlist__console">
            {localWatchlist &&
              localWatchlist.map((album, i) => {
                return (
                  <WatchlistAlbum _album={album} key={album.index} _index={i} />
                );
              })}
          </div>
        )}

        {isSearching && (
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

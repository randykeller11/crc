import React, { useState, useEffect } from "react";
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
  const [editMode, setEditMode] = useState(0);

  useEffect(() => {
    if (userData) {
      getData("watchlists", userData.id, setDbWatchlist);
    }
  }, [userData]);

  useEffect(() => {
    if (dbWatchlist) {
      let testDisplay = buildWatchlistDisplay(dbWatchlist.watchlist);
      setLocalWatchlist(testDisplay);
    }
  }, [dbWatchlist]);

  useEffect(() => {
    if (localWatchlist && localWatchlist.length === 20) {
      let localArray = [];
      for (let i = 0; i < 4; i++) {
        let targetAlbums = localWatchlist.filter((album) => album.row === i);
        localArray.push({ id: i, albums: targetAlbums });
      }
      setDisplayMap(localArray);
    }
  }, [localWatchlist]);

  //-----------------function to trick albumSearch component-----------

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
            {displayMap &&
              displayMap.map((row) => {
                return <WatchlistRow albums={row.albums} />;
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

import React, { useState, useEffect } from "react";
import { useFirestoreData } from "../hooks/useFirestoreData";
import db from "../config/firebase";
import AlbumSearch from "./AlbumSearch";
import { getData, writeToDb, whatRow } from "./helperFunctions";
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

  const rowAlbumsUpdate = (_index, _watchlistDisplay) => {
    let targetRow = whatRow(_index);
    let currentAlbums = _watchlistDisplay.find(
      (row) => row.rowNum === targetRow
    );

    let localArray = [...watchlistDisplay];
    let updateArray = localArray.filter((row) => row.rowNum != targetRow);
    // _setWatchlistDisplay(newArray.push());
    // console.log("the target row is:", targetRow);
    return { _updateArray: updateArray, albums: currentAlbums.albums };
  };

  const buildWatchlistDisplay = (_array) => {
    let localArray = [];
    for (let i = 0; i < 20; i++) {
      const rowTranslation = rowAlbumsUpdate(i, watchlistDisplay);
      if (i < _array.length) {
        let _testArray = [
          ...rowTranslation._updateArray,
          {
            rowNum: whatRow(i),
            albums: [...rowTranslation.albums, dbWatchlist.watchlist[i]],
          },
        ];
        console.log(_testArray);
        localArray.push(_array[i]);
      } else {
        localArray.push(0);
      }
    }
    return localArray;
  };

  useEffect(() => {
    if (dbWatchlist) {
      let testDisplay = buildWatchlistDisplay(dbWatchlist.watchlist);
      // setLocalWatchlist(testDisplay);
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
            <h1>watchlist console</h1>
            {/* {localWatchlist &&
              localWatchlist.map((album, i) => {
                return (
                  <WatchlistAlbum _album={album} key={album.index} _index={i} />
                );
              })} */}
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

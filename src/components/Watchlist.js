import React, { useState, useEffect } from "react";
import { useFirestoreData } from "../hooks/useFirestoreData";
import db from "../config/firebase";
import AlbumSearch from "./AlbumSearch";
import { getData, writeToDb } from "./helperFunctions";

function Watchlist() {
  const userData = useFirestoreData("users");
  const [payload, setPayload] = useState(null);
  const [localWatchlist, setLocalWatchlist] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (userData) {
      getData("watchlists", userData.id, setLocalWatchlist);
    }
  }, [userData]);

  //write payload to db dynamically
  useEffect(() => {
    if (payload) {
      writeToDb("watchlists", payload, userData.id);
    }
  }, [payload]);

  // useEffect(() => {
  //   if (watchlistData) {
  //     console.log(watchlistData.watchlist);
  //     let localArray = [];
  //     for (let i = 0; i < 20; i++) {
  //       if (i < watchlistData.watchlist.length) {
  //         localArray.push(watchlistData.watchlist[i]);
  //       }
  //       localArray.push(0);
  //     }
  //     setLocalWatchlist(localArray);
  //   }
  // }, [watchlistData]);

  return (
    <div className="watchlist">
      {userData ? (
        <div className="watchlist">
          {!isSearching && (
            <div className="watchlist__console">
              {localWatchlist &&
                localWatchlist.watchlist.map((album, i) => {
                  return <h1 key={i}>{album.title}</h1>;
                })}
              <button
                onClick={() => {
                  setIsSearching(true);
                  // setPayload({ emoji: "🍩", testPhrase: "donut" });
                }}
              >
                add Data
              </button>
            </div>
          )}

          {isSearching && (
            <div className="watchlist__search">
              <AlbumSearch
                _albumList={localWatchlist}
                _setAlbumList={setLocalWatchlist}
                _setIsAddingAlbum={setIsSearching}
              />
            </div>
          )}
        </div>
      ) : (
        <h1>loading watchlist...</h1>
      )}
    </div>
  );
}
export default Watchlist;

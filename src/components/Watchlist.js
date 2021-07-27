import React, { useState, useEffect } from "react";
import { useFirestoreData } from "../hooks/useFirestoreData";
import db from "../config/firebase";
import AlbumSearch from "./AlbumSearch";

function Watchlist() {
  const userData = useFirestoreData("users");
  const watchlistData = useFirestoreData("watchlists");
  const [payload, setPayload] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  //write payload to db dynamically
  useEffect(() => {
    async function writeToDb(_collection, _payload, _id) {
      // Add a new document in collection "users" with ID of userID
      const res = await db.collection(_collection).doc(`${_id}`).set(_payload);
    }

    if (payload) {
      writeToDb("watchlists", payload, userData.id);
    }
  }, [payload]);

  useEffect(() => {
    if (watchlistData) {
      console.log(watchlistData.watchlist);
    }
  }, [watchlistData]);

  return (
    <div>
      {userData && (
        <div className="watchlist">
          <button
            onClick={() => {
              setIsSearching(true);
              // setPayload({ emoji: "🍩", testPhrase: "donut" });
            }}
          >
            add Data
          </button>
          {isSearching && (
            <AlbumSearch
              _albumList={watchlist}
              _setAlbumList={setWatchlist}
              _setIsAddingAlbum={setIsSearching}
            />
          )}
        </div>
      )}
    </div>
  );
}
export default Watchlist;

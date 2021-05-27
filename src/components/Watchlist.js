import React, { useState, useEffect } from "react";
import db from "../config/firebase";
import { useAuth } from "../auth-context";
import SearchTest from "./SearchTest";

function Watchlist() {
  //   const albums = [
  //     {
  //       index: 0,
  //       id: 183133172,
  //     },
  //     {
  //       index: 1,
  //       id: 128447202,
  //     },
  //     {
  //       index: 2,
  //       id: 212686712,
  //     },
  //     {
  //       index: 3,
  //       id: 8835801,
  //     },
  //     {
  //       index: 4,
  //       id: 8114238,
  //     },
  //   ];

  const { currentUser } = useAuth();
  const [watchlistAlbums, setWatchlistAlbums] = useState([]);

  return (
    <div className="watchlist">
      <h1>welcome to the watchlist</h1>
      <SearchTest />
      {/* {result && (
        <div className="watchlist__card">
          <h1>{result.title}</h1>
          <img src={`${result.cover_big}`} />
        </div>
      )} */}
    </div>
  );
}

export default Watchlist;

//code for connecting database

//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (currentUser) {
//       const observer = db.collection("users").doc(`${currentUser.uid}`);
//       observer.onSnapshot((snapshot) => {
//         console.log(snapshot.data());
//         setUserData(snapshot.data());
//       });
//     }
//   }, [currentUser]);

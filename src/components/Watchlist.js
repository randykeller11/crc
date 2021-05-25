import React, { useState, useEffect } from "react";
import db from "../config/firebase";
import { useAuth } from "../auth-context";
import { useFetch } from "../hooks/useFetch";

function Watchlist() {
  const albums = [
    {
      index: 0,
      id: 183133172,
    },
    {
      index: 1,
      id: 128447202,
    },
    {
      index: 2,
      id: 212686712,
    },
    {
      index: 3,
      id: 8835801,
    },
    {
      index: 4,
      id: 8114238,
    },
  ];

  const { currentUser } = useAuth();
  const [watchlistAlbums, setWatchlistAlbums] = useState([]);
  const url = "http://localhost:4000/album/183133172/";
  const [result, error, isLoading] = useFetch(url);

  return (
    <div>
      <h2>watchlist connected</h2>
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

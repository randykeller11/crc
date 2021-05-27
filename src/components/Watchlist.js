import React, { useState, useEffect } from "react";
import db from "../config/firebase";
import { useAuth } from "../auth-context";
import SearchTest from "./SearchTest";

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
  const [watchlistAlbums, setWatchlistAlbums] = useState(albums);
  const [watchlistData, setWatchListData] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadStatus, setLoadStatus] = useState(0);

  useEffect(() => {
    const retrievalFunction = async (album) => {
      try {
        const response = await fetch(`http://localhost:4000/album/${album.id}`);
        const data = await response.json();
        const albumObject = { id: album.id, albumData: data };
        setResult(albumObject);
      } catch (error) {
        console.error("error from fetch: ", error);
        setError(error.message);
      }
    };
    const getData = () => {
      setLoadStatus(1);
      watchlistAlbums.forEach((album) => {
        console.log(album);
        retrievalFunction(album);
      });
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(result, "🏆🍩");
    if (result) {
      const localArray = [...watchlistData];
      localArray.push(result);
      setWatchListData(localArray);
    }
  }, [result]);

  return (
    <div className="watchlist">
      <h1>welcome to the watchlist</h1>
      {watchlistData.length === watchlistAlbums.length &&
        watchlistData.map((_album) => (
          <div>
            <h1>{_album.albumData.title}</h1>
            <img src={`${_album.albumData.cover_big}`} />
          </div>
        ))}
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

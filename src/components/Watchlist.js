import React, { useState, useEffect } from "react";
import { useFirestoreData } from "../hooks/useFirestoreData";
import db from "../config/firebase";
function Watchlist() {
  // const profileData = useProfileData();
  const userData = useFirestoreData("users");
  const [payload, setPayload] = useState(null);
  // const [userTest, setUserTest] = useState();
  // const [watchlistData, setWatchListData] = useState([]);
  // const [result, setResult] = useState(null);
  // const [error, setError] = useState(null);
  // const [loadStatus, setLoadStatus] = useState(0);

  useEffect(() => {
    async function writeToDb(_collection, _payload, _id) {
      // Add a new document in collection "users" with ID of userID
      const res = await db.collection(_collection).doc(`${_id}`).set(_payload);
    }

    if (payload && userData) {
      writeToDb("watchlists", payload, userData.id);
    }
  }, [payload]);

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  return (
    <div>
      <button
        onClick={() => {
          setPayload({ emoji: "🍩", testPhrase: "donut" });
        }}
      >
        add Data
      </button>
    </div>
  );
}
export default Watchlist;

//-----------------------function to retrieve albums and render----------------------
// useEffect(() => {
//   const retrievalFunction = async (album) => {
//     try {
//       const response = await fetch(`http://localhost:4000/album/${album.id}`);
//       const data = await response.json();
//       const albumObject = { id: album.id, albumData: data };
//       setResult(albumObject);
//     } catch (error) {
//       console.error("error from fetch: ", error);
//       setError(error.message);
//     }
//   };
//   const getData = () => {
//     setLoadStatus(1);
//     watchlistAlbums.forEach((album) => {
//       console.log(album);
//       retrievalFunction(album);
//     });
//   };
//   if (watchlistAlbums) {
//     getData();
//   }
// }, [watchlistAlbums]);

// useEffect(() => {
//   console.log(result, "🏆🍩");
//   if (result) {
//     const localArray = [...watchlistData];
//     localArray.push(result);
//     setWatchListData(localArray);
//   }
// }, [result]);

//   return (
//     <div className="watchlist">
//       <h1>welcome to the watchlist</h1>
//       {watchlistData.length === watchlistAlbums.length &&
//         watchlistData.map((_album) => (
//           <div>
//             <h1>{_album.albumData.title}</h1>
//             <img src={`${_album.albumData.cover_big}`} />
//           </div>
//         ))}
//     </div>
//   );
// }

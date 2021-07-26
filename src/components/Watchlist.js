import React, { useState, useEffect } from "react";
import { useProfileData } from "../hooks/useProfileData";
import { useFirestoreData } from "../hooks/useFirestoreData";
function Watchlist() {
  // const profileData = useProfileData();
  const userData = useFirestoreData("users");
  // const [userTest, setUserTest] = useState();
  // const [watchlistData, setWatchListData] = useState([]);
  // const [result, setResult] = useState(null);
  // const [error, setError] = useState(null);
  // const [loadStatus, setLoadStatus] = useState(0);

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  return <div>{userData && <h1>{userData.test}</h1>}</div>;
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

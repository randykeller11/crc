import { useState, useEffect } from "react";
import { useAuth } from "../auth-context";
import db from "../config/firebase";

export const useProfileData = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loadedUID, setLoadedUID] = useState(null);
  const [componentState, setComponentState] = useState(0);

  //load current user UID
  useEffect(() => {
    if (currentUser) {
      setLoadedUID(currentUser.uid);
    }
  }, [currentUser]);

  //load users data or error out
  useEffect(() => {
    async function checkForStorage() {
      var docRef = db.collection("users").doc(`${loadedUID}`);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setComponentState(2);
            setProfileData(doc.data());
            console.log("Document data:", doc.data());
          } else {
            setComponentState(1);
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
    if (loadedUID) {
      checkForStorage();
    }
  }, [loadedUID]);

  if (profileData) {
    return profileData;
  }
};

// //add document to firestore if user does not have storage
// useEffect(() => {
//   async function checkForStorage() {
//     var docRef = db.collection("watchlists").doc(`${loadedUID}`);

//     docRef
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//           setComponentState(2);
//           setProfileData(doc.data());
//           console.log("Document data:", doc.data());
//         } else {
//           setComponentState(1);
//           console.log("No such document!");
//         }
//       })
//       .catch(function (error) {
//         console.log("Error getting document:", error);
//       });
//   }

// async function addUserToFirestore() {
//   db.collection("users")
//     .doc(`${loadedUID}`)
//     .add({
//       UID: currentUser,
//       followers: [],
//       following: [],
//       watchlist: [],
//       bio: "",
//     })
//     .then(function () {
//       console.log("Value successfully written!");
//       checkForStorage();
//     })
//     .catch(function (error) {
//       console.error("Error writing Value: ", error);
//     });
// }

// if (componentState === 1) {
//   addUserToFirestore();
// }
// }, [componentState]);

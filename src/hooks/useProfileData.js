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

  //check if user has a document
  useEffect(() => {
    async function checkForStorage() {
      var docRef = db.collection("watchlists").doc(`${loadedUID}`);

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

  //add document to firestore if user does not have storage
  useEffect(() => {
    async function checkForStorage() {
      var docRef = db.collection("watchlists").doc(`${loadedUID}`);

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

    async function addUserToFirestore() {
      db.collection("watchlists")
        .doc(`${loadedUID}`)
        .set({
          watchlist: [
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
          ],
        })
        .then(function () {
          console.log("Value successfully written!");
          checkForStorage();
        })
        .catch(function (error) {
          console.error("Error writing Value: ", error);
        });
    }

    if (componentState === 1) {
      addUserToFirestore();
    }
  }, [componentState]);

  return [profileData, componentState, loadedUID];
};

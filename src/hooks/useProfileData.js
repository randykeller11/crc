import { useState, useEffect } from "react";
import { useAuth } from "../auth-context";
import db from "../config/firebase";

export const useProfileData = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState([]);
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
      var docRef = db.collection("test").doc(`${loadedUID}`);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
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
    async function addUserToFirestore() {
      db.collection("test")
        .doc(`${loadedUID}`)
        .set({
          value: "🏆",
        })
        .then(function () {
          console.log("Value successfully written!");
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

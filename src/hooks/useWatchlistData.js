import { useState, useEffect } from "react";
import { useAuth } from "../auth-context";
import db from "../config/firebase";

export const useFirestoreData = (_collection) => {
  const { currentUser } = useAuth();
  const [loadedUID, setLoadedUID] = useState(null);

  //load current user UID
  useEffect(() => {
    if (currentUser) {
      setLoadedUID(currentUser.uid);
    }
  }, [currentUser]);

  //load users data or error out
  useEffect(() => {
    async function checkForStorage() {
      var docRef = db.collection(_collection).doc(`${loadedUID}`);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setProfileData(doc.data());
            console.log("Document data:", doc.data());
          } else {
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

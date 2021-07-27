import { useState, useEffect } from "react";
import { useAuth } from "../auth-context";
import db from "../config/firebase";

export const useFirestoreData = (_collection) => {
  const { currentUser } = useAuth();
  const [firestoreData, setFirestoreData] = useState(null);

  //load current user UID
  useEffect(() => {
    async function getData(_uid) {
      var docRef = db.collection(_collection).doc(_uid);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setFirestoreData(doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
    if (currentUser) {
      getData(`${currentUser.uid}`);
    }
  }, [currentUser]);

  if (firestoreData) {
    return firestoreData;
  }
};

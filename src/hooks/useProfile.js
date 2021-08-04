import { useState, useEffect } from "react";
import { useAuth } from "../auth-context";
import db from "../config/firebase";

export const useProfile = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);

  //load current user UID
  useEffect(() => {
    async function getData(_uid) {
      var docRef = db.collection("users").doc(_uid);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setProfileData(doc.data());
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

  if (profileData) {
    return profileData;
  }
};

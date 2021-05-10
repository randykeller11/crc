import React, { useState, useEffect } from "react";
import db from "../config/firebase";
import { useAuth } from "../auth-context";

function Watchlist() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const observer = db.collection("users").doc(`${currentUser.uid}`);
      observer.onSnapshot((snapshot) => {
        console.log(snapshot.data());
        setUserData(snapshot.data());
      });
    }
  }, [currentUser]);

  return (
    <div>
      <h2>watchlist connected</h2>
    </div>
  );
}

export default Watchlist;

import React, { useState, useEffect } from "react";
import { useAuth } from "../auth-context";
import db from "../config/firebase";

function Onboarding() {
  const { currentUser } = useAuth();
  const [userAdded, setUserAdded] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (currentUser) {
      //   db.collection("test")
      //     .doc("W5XlKyw5am14A9Alna3R")
      //     .onSnapshot((snapshot) => {
      //       setUserData(snapshot);
      //     });
      // }
      setUserData(currentUser);
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Profile</h2>
      {currentUser && (
        <div>
          <h2>{currentUser.email}</h2>
          <h2>{currentUser.uid}</h2>
        </div>
      )}
    </div>
  );
}

export default Onboarding;

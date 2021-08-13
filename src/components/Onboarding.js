import React, { useState, useEffect } from "react";
import { useAuth } from "../auth-context";
import db from "../config/firebase";
import { Redirect } from "react-router-dom";

function Onboarding() {
  const { currentUser } = useAuth();
  const [onboardMode, setOnboardMode] = useState(0);
  const [accountType, setAccountType] = useState(null);

  useEffect(() => {
    async function addAccountTypeToDb() {
      // Add a new document in collection "users" with ID of userID
      const res = await db.collection("users").doc(`${currentUser.uid}`).set(
        {
          accountType: accountType,
        },
        { merge: true }
      );
    }

    //logic for adding user
    if (onboardMode === 1) {
      addAccountTypeToDb();
      setOnboardMode(2);
    }
  }, [onboardMode]);

  return (
    <div>
      {onboardMode === 0 && (
        <div>
          <h1>What best describes you?</h1>
          <h3
            onClick={() => {
              setAccountType(0);
              setOnboardMode(1);
            }}
          >
            I'm here to buy records
          </h3>
          <h3
            onClick={() => {
              setAccountType(1);
              setOnboardMode(1);
            }}
          >
            I'm a record store here to sell records
          </h3>
        </div>
      )}
      {onboardMode == 2 && accountType === 0 && <Redirect to="/" />}
      {onboardMode == 2 && accountType === 1 && <Redirect to="/storetest" />}
    </div>
  );
}

export default Onboarding;

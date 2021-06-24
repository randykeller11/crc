import React, { useState, useEffect } from "react";
import { useAuth } from "../auth-context";
import db from "../config/firebase";
import { Redirect } from "react-router-dom";

function Onboarding() {
  const { currentUser } = useAuth();

  //onboard mode
  //1 no user in db so trigger upload
  //2 user is already in db so check the onboard state in document
  const [onboardMode, setOnboardMode] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //check if user is in database
    async function checkUser() {
      const userRef = db.collection("users").doc(`${currentUser.uid}`);
      const doc = await userRef.get();
      if (!doc.exists) {
        setOnboardMode(1);
        console.log("No such document!");
      } else {
        //if user exists attach the listener
        setOnboardMode(2);
      }
    }

    if (currentUser) {
      checkUser();
    }
  }, [currentUser]);

  //add user to database if not already added

  useEffect(() => {
    async function addUserToDb() {
      const data = {
        id: currentUser.uid,
        onboardStatus: 0,
        test: "🔑",
      };
      // Add a new document in collection "users" with ID of userID
      const res = await db
        .collection("users")
        .doc(`${currentUser.uid}`)
        .set(data);
    }

    //logic for adding user
    if (onboardMode === 1) {
      addUserToDb();
      setOnboardMode(2);
    }
  }, [onboardMode]);

  return onboardMode === 2 ? (
    <Redirect to={`/profile/${currentUser.uid}`} />
  ) : (
    <div>
      <h1>onboarding you to the platform!</h1>
    </div>
  );
}

export default Onboarding;

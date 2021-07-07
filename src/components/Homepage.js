import React, { useEffect } from "react";
import { auth } from "../config/firebase";
import UploadForm from "./UploadForm";
import MakePost from "./MakePost";
import { useAuth } from "../auth-context";

const signOutFunction = () => {
  auth
    .signOut()
    .then(function () {
      // Sign-out successful.
      console.log("signed out");
    })
    .catch(function (error) {
      // An error happened.
    });
};

function Homepage() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Homepage</h1>
      {currentUser && <MakePost uid={currentUser.uid} />}
      <button onClick={signOutFunction}>Logout</button>
    </div>
  );
}

export default Homepage;

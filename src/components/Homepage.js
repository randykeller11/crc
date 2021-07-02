import React from "react";
import { auth } from "../config/firebase";
import UploadForm from "./UploadForm";
import MakePost from "./MakePost";

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
  return (
    <div>
      <h1>Homepage</h1>
      <MakePost />
      <button onClick={signOutFunction}>Logout</button>
    </div>
  );
}

export default Homepage;

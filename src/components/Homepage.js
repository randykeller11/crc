import React from "react";
import { auth } from "../config/firebase";
import UploadForm from "./UploadForm";

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
      <h1>Welcome to Community Record Club</h1>
      <h3>Support local record stores!</h3>
      <button onClick={signOutFunction}>Logout</button>
      <UploadForm />
    </div>
  );
}

export default Homepage;

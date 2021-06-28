import React from "react";
import { auth } from "../config/firebase";

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
      <h2>
        Welcome to Community Record Club a record club for the 21st century!
      </h2>
      <button onClick={signOutFunction}>Logout</button>
    </div>
  );
}

export default Homepage;

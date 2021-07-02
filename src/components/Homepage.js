import React from "react";
import { auth } from "../config/firebase";
import UploadForm from "./UploadForm";
import MakePost from "./MakePost";
import { useProfileData } from "../hooks/useProfileData";

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
  const [profileData, componentState, loadedUID] = useProfileData();

  return (
    <div>
      <h1>Homepage</h1>
      <MakePost uid={loadedUID} profileData={profileData} />
      <button onClick={signOutFunction}>Logout</button>
    </div>
  );
}

export default Homepage;

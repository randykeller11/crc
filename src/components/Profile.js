import React, { useState, useEffect } from "react";
import { useAuth } from "../auth-context";
import { Link } from "react-router-dom";
import { useProfileData } from "../hooks/useProfileData";

function Profile() {
  const [profileData, componentState, loadedUID] = useProfileData();

  return (
    <div>
      <h2>Profile</h2>
      {profileData && <h3>{profileData.posts[0].text}</h3>}
      {loadedUID && (
        <Link to={`/profile/${loadedUID}/watchlist`}>Watchlist</Link>
      )}
    </div>
  );
}

export default Profile;

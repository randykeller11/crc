import React, { useEffect } from "react";
import { useAuth } from "../auth-context";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <Link to={`/profile/${currentUser.uid}/watchlist`}>Watchlist</Link>
    </div>
  );
}

export default Profile;

import React from "react";
import { useAuth } from "../auth-context";
import { Redirect } from "react-router-dom";

function ProfileReroute() {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Redirect to={`/profile/${currentUser.uid}`} />;
  }
  return;
}

export default ProfileReroute;

import React from "react";
import { useAuth } from "../auth-context";
import FetchTest from "./FetchTest";

function Profile() {
  const { logout } = useAuth();
  return (
    <div>
      <h2>Profile</h2>
      <button onClick={logout}>Logout</button>
      <FetchTest />
    </div>
  );
}

export default Profile;

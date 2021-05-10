import React, { useEffect } from "react";
import { useAuth } from "../auth-context";
import FetchTest from "./FetchTest";

function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <FetchTest />
    </div>
  );
}

export default Profile;

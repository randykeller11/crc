import React from "react";
import { useAuth } from "../auth-context";

function Home() {
  const { login } = useAuth();
  return (
    <div>
      <h1>
        Welcome to Community Record Club a record club for the 21st century!
      </h1>
      <h2>Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Home;

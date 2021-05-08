import React, { useState, useEffect } from "react";
import "./App.css";
import { useAuth } from "./auth-context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes";

function App() {
  const { loggedIn } = useAuth();

  return loggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
}

export default App;

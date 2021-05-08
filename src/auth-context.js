import React, { createContext, useEffect, useState } from "react";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    sleep(2000).then(() => setLoggedIn(true));
  };
  const logout = () => {
    sleep(2000).then(() => setLoggedIn(false));
  };

  const authContextValue = {
    login,
    loggedIn,
    logout,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };

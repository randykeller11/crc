import React, { createContext, useState, useEffect } from "react";
import { firebaseApp } from "./config/firebase";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setUser);
  }, []);

  const authContextValue = {
    signin: (e, p) => firebaseApp.auth().signInWithEmailAndPassword(e, p),
    currentUser: user,
    signout: () => firebaseApp.auth().signOut(),
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };

import React, { useState, useEffect } from "react";
import "./App.css";
import { useAuth } from "./auth-context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes";
import { firebaseApp, auth } from "./config/firebase";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        console.log("no user");
        setUser(null);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (!user) return;

  //   const userRef = firebaseApp.firestore().collection("users").doc(user.uid);
  //   userRef.get().then((doc) => {
  //     if (!doc.exists) {
  //       console.log("No such document!");
  //     } else {
  //       console.log("Document data:", doc.data());
  //     }
  //   });
  // }, [user]);

  return user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
}

export default App;

import React, { useRef } from "react";
import { firebaseApp, auth } from "../config/firebase";
import { Redirect, Link } from "react-router-dom";

function Home() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signOutFunction = () => {
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log("signed out");
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return auth.currentUser ? (
    <div>
      <h2>
        Welcome to Community Record Club a record club for the 21st century!
      </h2>
      <button onClick={signOutFunction}>Logout</button>
    </div>
  ) : (
    <div className="signin">
      <form action="">
        <h1>Sign in</h1>
        <input ref={emailRef} type="email" />
        <input ref={passwordRef} type="password" />
        <button onClick={signIn}>Sign in </button>
        <h6>
          Not yet registered? <Link to="/signup">Create Account</Link>
        </h6>
      </form>
    </div>
  );
}

export default Home;

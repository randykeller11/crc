import React, { useRef } from "react";
import { firebaseApp, auth } from "../config/firebase";
import { Redirect, Link } from "react-router-dom";
import Homepage from "./Homepage";

function Home() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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

  return auth.currentUser ? (
    <Homepage />
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

import React, { useRef, useState } from "react";
import { firebaseApp, auth } from "../config/firebase";
import { Redirect } from "react-router-dom";

function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isSubmitted ? (
    <Redirect to="/" />
  ) : (
    <div className="signUp_form">
      <form action="">
        <h1>Create Account</h1>
        <input ref={emailRef} type="email" />
        <input ref={passwordRef} type="password" />
        <button onClick={signUp}>submit </button>
      </form>
    </div>
  );
}

export default SignUp;

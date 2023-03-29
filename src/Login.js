// Login component

import "./Login.css";

import React, { useState } from "react";
import "firebase/compat/auth";
import { auth } from "./firebase";

function Login(props) {
  // initialize form data
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // toggles which form is being shown
  function toggle() {
    setShowSignUp(!showSignUp);
  }

  // call to fire base to attempt a sign in
  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        props.updateUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // attempt a log in
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User created
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    // reset all values to blank
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-container">
      {/* decide which form to show */}
      {showSignUp ? (
        // create account form
        <form>
          <h1>Create An Account</h1>

          {/* username field */}
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password field */}
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* confirm password */}
          <div>
            <label htmlFor="password">confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* buttons */}
          <button
            onClick={(e) => {
              // temporary prevent default so we can get things set up
              e.preventDefault();
              handleSignUp();
            }}
          >
            Create Account
          </button>

          {/* sign link */}
          <span onClick={toggle}>sign in</span>
        </form>
      ) : (
        // login form
        <form>
          <h1>Log In</h1>

          {/* username field */}
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password field */}
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* buttons */}
          <button
            onClick={(e) => {
              // temporary prevent default
              e.preventDefault();
              handleSignIn();
            }}
          >
            Sign In
          </button>

          {/* sign link */}
          <span onClick={toggle}>create account</span>
        </form>
      )}
    </div>
  );
}

export default Login;

import "./App.css";
import Login from "./Login";
import { useState, useEffect } from "react";

//importing auth to sign out to show how this is done.  We will have to put this into a new component later, I'll do that with Jacob tomorrow so I can show him how React works.
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  function updateUser(newUser) {
    setUser(newUser);
  }

  // useEffect is necessary for detecting that the log out occurred.
  // without it, the view does not get updated when user object changes.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  // sample of how to log out, will include this into a different component later
  function logout() {
    auth
      .signOut()
      .then(() => {
        console.log("user signed out");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="App">
      {/* this here header thing is making this nice background color happen */}
      <header className="App-header">
        <h1>College University</h1>
        {user ? (
          // logged in, go to main application
          <div>
            {user.email}
            <button onClick={logout}>log out</button>
          </div>
        ) : (
          // not logged in, show login page
          <Login updateUser={updateUser} />
        )}
      </header>
    </div>
  );
}

export default App;

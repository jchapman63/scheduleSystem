import "./App.css";
import Login from "./Login";
import app from "./Firebase";

function App() {
  return (
    <div className="App">
      {/* this here header thing is making this nice background color happen */}
      <header className="App-header">
        <h1>College University</h1>
        <Login />
      </header>
    </div>
  );
}

export default App;

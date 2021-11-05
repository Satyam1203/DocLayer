import "./App.css";
import "./components/style.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Main from "./components/Main";
import MyDocs from "./components/MyDocs";
import NavBar from "./components/NavBar";

function App() {
  const { logout, loginWithRedirect } = useAuth0();

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/new">
            <Main />
          </Route>
          <Route path="/my-docs">
            <MyDocs />
          </Route>
          <Route path="/">
            <header className="App-header">
              <button onClick={loginWithRedirect}>Sign-In</button>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </button>
            </header>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

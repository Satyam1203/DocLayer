import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

import Profile from "./Profile";

function App() {
  const { logout, loginWithRedirect } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={loginWithRedirect}>Sign-In</button>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
        <Profile />
      </header>
    </div>
  );
}

export default App;

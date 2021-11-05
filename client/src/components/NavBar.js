import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function NavBar() {
  const { isAuthenticated, user, loginWithPopup, logout } = useAuth0();

  return (
    <div className="navigation-bar">
      <h2>
        <Link to="/">Doc Layer</Link>
      </h2>
      <nav>
        {!isAuthenticated ? (
          <button onClick={loginWithPopup}>Sign-In</button>
        ) : (
          <>
            <Link to="/create">Create</Link>
            <Link to="/my-docs">My Docs</Link>
            <p>{user?.name}</p>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
}

export default NavBar;

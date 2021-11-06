import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function NavBar() {
  const { isAuthenticated, user, loginWithPopup, logout } = useAuth0();

  return (
    <div className="navigation-bar">
      <h2 className="app-title">
        <Link to="/">
          <span style={{ color: "var(--blue)" }}>Doc</span>Layer
        </Link>
      </h2>
      <nav>
        {!isAuthenticated ? (
          <button className="nav-btn" onClick={loginWithPopup}>
            Sign-In
          </button>
        ) : (
          <>
            <Link to="/create">Create</Link>
            <Link to="/my-docs">My Docs</Link>
            <div className="profile-options">
              <img className="avatar" src={user?.picture} alt="profile" />
              <button
                className="nav-btn"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default NavBar;

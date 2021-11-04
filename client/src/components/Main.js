import "./style.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

import Controls from "./Controls";
import Doc from "./Doc";

function Main() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="main-container">
      <Controls />
      <Doc />
    </div>
  );
}

export default Main;

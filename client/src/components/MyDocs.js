import "./style.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import parse from "html-react-parser";

import request from "../helpers/request";

function MyDocs() {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (isLoading || !user?.email) return;
    (async () => {
      const res = await request("/api/find/all", { email: user.email });
      setDocs(res.documents);
    })();

    return () => {
      setDocs([]);
    };
  }, [isLoading, user.email]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div>
      {docs?.length > 0 &&
        docs.map((doc, i) => (
          <div key={i}>
            <p>{doc.fileName}</p>
            <div>{parse(doc.content)}</div>
          </div>
        ))}
    </div>
  );
}

export default MyDocs;

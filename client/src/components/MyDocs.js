import "./style.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, Link, useHistory } from "react-router-dom";
import parse from "html-react-parser";

import request from "../helpers/request";

function MyDocs() {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const history = useHistory();
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
  }, [isLoading, user]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="docs-wrapper">
      {docs?.length > 0 &&
        docs.map((doc, i) => (
          <div className="doc-card" key={i}>
            <p className="doc-name">{doc.fileName}</p>
            <div className="doc-content">{parse(doc.content)}</div>
            <div className="doc-action-buttons">
              <button onClick={() => history.push(`/create/${doc.fileName}`)}>
                <i className="far fa-edit"></i>
              </button>
              <button onClick={() => {}}>
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      {docs && docs.length === 0 && (
        <div>
          <h4>
            No documents to display. Please start by creating a new one{" "}
            <Link to="/create">here</Link>
          </h4>
        </div>
      )}
    </div>
  );
}

export default MyDocs;

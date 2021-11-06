import "./style.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, Link, useHistory } from "react-router-dom";
import parse from "html-react-parser";

import image from "../not_found.svg";
import request from "../helpers/request";

function MyDocs() {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const history = useHistory();
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    (async () => {
      const res = await request("/api/find/all", { email: user.email });
      setDocs(res.documents);
    })();

    return () => {
      setDocs(null);
    };
  }, [isLoading, user]);

  const deleteDoc = async (name) => {
    if (loading) return;
    setLoading(true);
    const res = await request(`/api/remove`, {
      fileName: name,
      email: user.email,
    });
    console.log(res);
    setLoading(false);
    if (!res.success) {
      alert(res.message);
    } else {
      const updatedDocs = docs.filter((doc) => doc.fileName !== name);
      setDocs(updatedDocs);
    }
    return;
  };

  if (isLoading) return <div className="text-center">Authenticating...</div>;
  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="docs-wrapper">
      {docs?.length > 0 &&
        docs.map((doc, i) => (
          <div className="doc-card" key={i}>
            <p className="doc-name">{doc.fileName}</p>
            <div className="doc-content">{parse(doc.content)}</div>
            <div className="doc-action-buttons">
              <span
                onClick={() => {
                  if (!loading) history.push(`/create/${doc.fileName}`);
                }}
              >
                <i className="far fa-edit"></i>
              </span>
              <span
                onClick={() => {
                  deleteDoc(doc.fileName);
                }}
              >
                <i className="far fa-trash-alt"></i>
              </span>
            </div>
          </div>
        ))}
      {docs && docs.length === 0 && (
        <div className="text-center">
          <img
            style={{ margin: "16px 0" }}
            src={image}
            alt="Not Found"
            width="250"
          />
          <h4>
            No documents to display. <br />
            Please start by creating a new one{" "}
            <Link style={{ color: "blue" }} to="/create">
              here.
            </Link>
          </h4>
        </div>
      )}
    </div>
  );
}

export default MyDocs;

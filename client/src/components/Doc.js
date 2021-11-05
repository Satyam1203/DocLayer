import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useAuth0 } from "@auth0/auth0-react";
import request from "../helpers/request";

function Doc({ docRef, file = null }) {
  const {
    user: { email },
  } = useAuth0();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if (!file) return;
    (async () => {
      const res = await request("/api/find", { email, fileName: file });
      console.log(res);
      if (res.success) {
        setDoc(res.document);
      }
    })();
  }, [email, file]);

  return (
    <div>
      <div ref={docRef} className="doc" contentEditable="true">
        {doc?.content && parse(doc.content)}
      </div>
    </div>
  );
}

export default Doc;

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useAuth0 } from "@auth0/auth0-react";
import request from "../helpers/request";

function Doc({ docRef, file = "", newFile }) {
  const { user } = useAuth0();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if (!file) return;
    (async () => {
      const res = await request("/api/find", {
        email: user.email,
        fileName: file,
      });
      console.log(res);
      if (res.success) {
        setDoc(res.document);
      }
    })();
  }, [user, file, newFile]);

  return (
    <div>
      <div
        ref={docRef}
        className="doc"
        contentEditable="true"
        suppressContentEditableWarning={true}
      >
        {newFile ? "" : doc?.content && parse(doc.content)}
      </div>
    </div>
  );
}

export default Doc;

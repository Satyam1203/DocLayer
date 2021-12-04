import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import request from "../helpers/request";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Doc({ editorState, setEditorState, file = "", newFile }) {
  const { user } = useAuth0();
  const [initialContentState, setInitialContentState] = useState({
    blocks: [],
    entityMap: {},
  });

  useEffect(() => {
    if (!file) {
      setEditorState(EditorState.createEmpty());
      return;
    }
    (async () => {
      const res = await request("/api/find", {
        email: user.email,
        fileName: file,
      });
      if (res.success) {
        setInitialContentState(JSON.parse(res.document.content));
        document.querySelector(".rdw-editor-main").click();
      }
    })();
    //  eslint-disable-next-line
  }, [user, file, newFile]);

  return (
    <div>
      <Editor
        editorStyle={{
          background: "#FFF",
          width: "100%",
          height: "450px",
          boxShadow: "0 3px 16px 0 rgb(0 0 0 / 11%)",
          padding: "12px",
          backgroundColor: "#fff",
        }}
        contentState={initialContentState}
        editorState={editorState}
        onEditorStateChange={(s) => {
          setEditorState(s);
        }}
      />
    </div>
  );
}

export default Doc;

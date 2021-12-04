import "./style.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { EditorState } from "draft-js";

import Controls from "./Controls";
import Doc from "./Doc";

function Main({ newFile = false }) {
  const { file } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div className="main-container">
      <Controls editorState={editorState} file={file} newFile={newFile} />
      <Doc
        editorState={editorState}
        setEditorState={setEditorState}
        file={file}
        newFile={newFile}
      />
    </div>
  );
}

export default Main;

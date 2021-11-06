import "./style.css";
import { useRef } from "react";
import { useParams } from "react-router-dom";

import Controls from "./Controls";
import Doc from "./Doc";

function Main({ newFile = false }) {
  const { file } = useParams();
  const docRef = useRef(null);

  return (
    <div className="main-container">
      <Controls docRef={docRef} file={file} newFile={newFile} />
      <Doc docRef={docRef} file={file} newFile={newFile} />
    </div>
  );
}

export default Main;

import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import html2pdf from "html2pdf.js";

import request from "../helpers/request";

function Controls({ docRef, file = "", newFile }) {
  const history = useHistory();
  const { user } = useAuth0();
  const [fileName, setFileName] = useState(newFile ? "" : file);
  const [loading, setLoading] = useState(false);
  const [fileExists, setFileExists] = useState(!!file);

  useEffect(() => {
    setFileName(newFile ? "" : file);
    setFileExists(!!file);
  }, [newFile, file]);

  const saveDoc = async () => {
    if (!fileName) {
      alert("Please enter file name");
      return;
    }
    if (!docRef.current.innerHTML) {
      alert("Please enter some text");
      return;
    }
    setLoading(true);
    const res = await request(`/api/${fileExists ? "update" : "save"}`, {
      fileName,
      content: docRef.current.innerHTML,
      email: user.email,
    });
    console.log(res);
    setLoading(false);
    if (!res.success) {
      alert(res.message);
    } else {
      setFileExists(true);
    }
    return;
  };

  const deleteDoc = async (name) => {
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
      history.push("/my-docs");
    }
    return;
  };

  const download = () => {
    html2pdf()
      .set({
        margin: 8,
        filename: fileName,
        image: { quality: 1 },
        html2canvas: { scale: 1 },
      })
      .from(docRef.current)
      .save();
  };

  return (
    <div className="controls">
      <input
        className="input-file-name"
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name"
        disabled={fileExists}
      />
      <div>
        <button onClick={saveDoc} disabled={loading}>
          <i className="far fa-save"></i>
        </button>
        {fileExists && (
          <button
            className="delete-btn"
            onClick={() => deleteDoc(fileName)}
            disabled={loading}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        )}
      </div>
      {fileExists && (
        <button className="download-btn" onClick={download}>
          <i className="fas fa-download"></i>Generate pdf
        </button>
      )}
    </div>
  );
}

export default Controls;

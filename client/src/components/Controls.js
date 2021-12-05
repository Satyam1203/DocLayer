import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import draftToHtml from "draftjs-to-html";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

import { convertToRaw } from "draft-js";
import request from "../helpers/request";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Controls({ editorState, file = "", newFile }) {
  const history = useHistory();
  const { user } = useAuth0();
  const [fileName, setFileName] = useState(newFile ? "" : file);
  const [loading, setLoading] = useState(false);
  const [fileExists, setFileExists] = useState(!!file);
  const [error, setError] = useState("");

  useEffect(() => {
    setFileName(newFile ? "" : file);
    setFileExists(!!file);
  }, [newFile, file]);

  const saveDoc = async () => {
    const content = convertToRaw(editorState.getCurrentContent());
    if (!user) {
      alert("Please sign-in to save the document");
      return;
    }
    if (!fileName) {
      alert("Please enter file name");
      return;
    }
    if (content.blocks.length === 0 && content.blocks[0].text === "") {
      alert("Please enter some text");
      return;
    }
    setLoading(true);
    const res = await request(`/api/${fileExists ? "update" : "save"}`, {
      fileName,
      content: JSON.stringify(content),
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

  // implement download

  const download = () => {
    let download = false;
    try {
      let html = htmlToPdfmake(`
      <div>
      ${draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      </div>
      `);
      let dd = { content: html };
      pdfMake.createPdf(dd).download(`${fileName || "document.pdf"}`, () => {
        download = true;
        setError("");
      });
    } catch (e) {
      console.log(e);
    } finally {
      if (!download)
        setError(
          "We currently have some limitations on generating pdfs. We don't support images, all types of fonts."
        );
    }
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
          <i className="far fa-save"></i> Save
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
      <button className="download-btn" onClick={download}>
        <i className="fas fa-download"></i>Generate pdf
      </button>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}

export default Controls;

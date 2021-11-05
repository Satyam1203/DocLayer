import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import request from "../helpers/request";

function Controls({ docRef, file = "", newFile }) {
  const history = useHistory();
  const { user } = useAuth0();
  const [fileName, setFileName] = useState(newFile ? "" : file);
  const [loading, setLoading] = useState(false);
  const [fileExists, setFileExists] = useState(!!file);

  useEffect(() => {
    setFileName(newFile ? "" : file);
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

  const deleteDoc = async () => {
    setLoading(true);
    const res = await request(`/api/remove`, {
      fileName,
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

  return (
    <div className="controls">
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        disabled={!!file}
      />
      <button onClick={saveDoc} disabled={loading}>
        Save
      </button>
      {fileExists && (
        <button onClick={deleteDoc} disabled={loading}>
          Delete
        </button>
      )}
    </div>
  );
}

export default Controls;

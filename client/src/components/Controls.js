import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import request from "../helpers/request";

function Controls({ docRef, file = null }) {
  const { user } = useAuth0();
  const [fileName, setFileName] = useState(file ?? "");
  const [loading, setLoading] = useState(false);

  const saveDoc = async () => {
    if (!fileName) {
      alert("Please enter file name");
      return;
    }
    setLoading(true);
    const res = await request(`/api/${file ? "update" : "save"}`, {
      fileName,
      content: docRef.current.innerHTML,
      email: user.email,
    });
    console.log(res);
    if (!res.success) {
      alert(res.message);
    }
    setLoading(false);
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
      <button>Delete</button>
    </div>
  );
}

export default Controls;

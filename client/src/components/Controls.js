import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import request from "../helpers/request";

function Controls({ docRef }) {
  const { user } = useAuth0();
  const [fileName, setFileName] = useState("");

  const createDoc = async () => {
    if (!fileName) {
      alert("Please enter file name");
      return;
    }
    const res = await request("/api/save", {
      fileName,
      content: docRef.current.innerHTML,
      email: user.email,
    });
    console.log(res);
    return;
  };

  return (
    <div className="controls">
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={createDoc}>Save</button>
      <button>Delete</button>
    </div>
  );
}

export default Controls;

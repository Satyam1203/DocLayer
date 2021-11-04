import { useState } from "react";

function Controls() {
  const [fileName, setFileName] = useState("");

  return (
    <div className="controls">
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button>Save</button>
      <button>Delete</button>
    </div>
  );
}

export default Controls;

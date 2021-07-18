import React, { useState, useEffect } from "react";
import axios from "axios";
import './File.css';



function File() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    } 
  };

  
  
  

  return (
    <div className="fileContainer">
      <input className="fileInput" id="file" type="file" onChange={saveFile} />
      <button className="upload" onClick={uploadFile}>Upload</button>
    </div>
  );
};
export default File;
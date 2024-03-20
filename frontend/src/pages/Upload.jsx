import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
const Upload = () => {
  const { user } = useAuthContext();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("desc", desc);

    try {
      const response = await fetch("/api/image/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Clear the form after successful upload
        setFile(null);
        setName("");
        setDesc("");
      } else {
        setMessage("Incorrect file format");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image");
    }
  };

  return (
    <div className="">
      <form
        className="container w-50 border p-5 mt-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Upload Image</label>

          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
            name="image"
            required

          />
          <small>It take only jpeg, jpg and png</small>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            value={desc}
            className="form-control"
            id="desc"
            placeholder="Description"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;

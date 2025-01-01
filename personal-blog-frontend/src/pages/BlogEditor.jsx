import React, { useState } from "react";
import axios from "axios";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5002/api/blogs/create",
        {
          title,
          content,
        }
      );
      setMessage("Blog created successfully");
      setTitle("");
      setContent("");
      console.log(response.data);
    } catch (err) {
      setMessage("Failed to create blog");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Create a New Blog</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="block w-full p-3 border mb-4"
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="block w-full p-3 border mb-4"
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;

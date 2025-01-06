// BlogEditor.jsx with Markdown Support
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import "react-quill/dist/quill.snow.css"; // Quill's snow theme
import { useAuth } from "../context/AuthContext";
import ReactQuill from "react-quill";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { axiosInstance, accessToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    if (!content.trim() || content.trim().length < 10) {
      setError("Content should be at least 10 characters long");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:5002/api/blogs/create",
        {
          title,
          content,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      navigate(`/blogs/${response.data._id}`); // Redirect to the blog detail page after submission
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("Failed to create the blog. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Create a New Blog
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="bg-white"
            theme="snow" // Snow is the default theme
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;

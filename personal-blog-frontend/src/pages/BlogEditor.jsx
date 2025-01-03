// BlogEditor.jsx with Markdown Support
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    if (content.trim().length() < 10) {
      setError("Content should be at least 10 characters long");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5002/api/blogs/create",
        {
          title,
          content,
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

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
            placeholder="Blog Title"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content in Markdown..."
            rows="10"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex justify-between">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            {preview ? "Edit Mode" : "Preview Mode"}
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>

      {preview && (
        <div className="markdown-body mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Preview</h2>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;

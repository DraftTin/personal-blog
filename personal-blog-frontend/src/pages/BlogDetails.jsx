// BlogDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/blogs/${id}`
        );
        setBlog(response.data);
      } catch (err) {
        setError("Error fetching blog details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="p-6 text-center text-gray-500">Blog not found</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">{blog.title}</h1>
      <ReactMarkdown className="markdown-body text-gray-700">
        {blog.content}
      </ReactMarkdown>
      <p className="text-sm text-gray-500">
        Author: {blog.author || "Anonymous"}
      </p>
      <p className="text-sm text-gray-500">
        Created at: {new Date(blog.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default BlogDetails;

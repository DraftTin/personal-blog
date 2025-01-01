import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/blogs/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">{blog.title}</h1>
      <p className="text-gray-700 mb-6">{blog.content}</p>
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

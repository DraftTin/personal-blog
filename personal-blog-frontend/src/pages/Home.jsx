import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import htmlTruncate from "html-truncate";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { accessToken, user, axiosInstance } = useAuth();
  const limit = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/blogs?page=${page}&limit=${limit}${
            searchTerm ? `&search=${searchTerm}` : ""
          }`
        );
        setBlogs(response.data.blogs);
        setTotalPages(
          response.data.totalPages > 0 ? response.data.totalPages : 1
        );
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [page, searchTerm]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;
    try {
      await axiosInstance.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handlePageChange = (direction) => {
    setPage((prevPage) => Math.max(1, prevPage + direction));
  };

  const handleSearch = () => {
    setPage(1); // Reset to the first page for search results
  };

  const truncateHTML = (html, maxLength) => {
    return htmlTruncate(html, maxLength, { ellipsis: "..." });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 text-center rounded-lg shadow-lg mb-8">
        <h1 className="text-5xl font-bold mb-4">Discover Amazing Blogs</h1>
        <p className="text-xl">Explore and share your ideas with the world.</p>
      </div>

      {/* Search Section */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-l-lg p-3 w-1/2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Blog Cards */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                <Link to={`/blogs/${blog._id}`} className="hover:underline">
                  {blog.title}
                </Link>
              </h2>
              <div
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{
                  __html: truncateHTML(blog.content, 200),
                }}
              ></div>
              <p className="text-sm text-gray-500">
                Author: {blog.author.username}
              </p>
              {user._id == blog.author._id && (
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center">
        <button
          className="mr-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          disabled={page === 1}
          onClick={() => handlePageChange(-1)}
        >
          Previous
        </button>
        <span className="font-medium text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          className="ml-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          disabled={page === totalPages}
          onClick={() => handlePageChange(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

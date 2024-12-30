import React, { useState } from 'react';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    console.log('Blog Title:', title);
    console.log('Blog Content:', content);
    // API call to save the blog
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Create a New Blog</h1>
      <input
        className="w-full p-3 border border-gray-300 rounded mb-4"
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-3 border border-gray-300 rounded mb-4"
        placeholder="Write your blog content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Publish
      </button>
    </div>
  );
};

export default BlogEditor;

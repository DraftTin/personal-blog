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
    <div>
      <h1>Blog Editor</h1>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Publish</button>
    </div>
  );
};

export default BlogEditor;

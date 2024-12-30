import React from 'react';

const BlogCard = ({ title, excerpt }) => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-gray-700">{excerpt}</p>
  </div>
);

export default BlogCard;

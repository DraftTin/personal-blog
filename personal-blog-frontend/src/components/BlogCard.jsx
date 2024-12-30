import React from 'react';

const BlogCard = ({ title, excerpt }) => (
  <div className="blog-card">
    <h2>{title}</h2>
    <p>{excerpt}</p>
  </div>
);

export default BlogCard;

import React from 'react';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const dummyPosts = [
    { id: 1, title: 'First Blog', excerpt: 'This is the first blog post.' },
    { id: 2, title: 'Second Blog', excerpt: 'Another blog post excerpt.' },
  ];

  return (
    <div>
      <h1>Home Page</h1>
      {dummyPosts.map((post) => (
        <BlogCard key={post.id} title={post.title} excerpt={post.excerpt} />
      ))}
    </div>
  );
};

export default Home;

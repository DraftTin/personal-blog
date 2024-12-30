import React from 'react';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const dummyPosts = [
    { id: 1, title: 'First Blog', excerpt: 'This is the first blog post.' },
    { id: 2, title: 'Second Blog', excerpt: 'Another blog post excerpt.' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyPosts.map((post) => (
          <BlogCard key={post.id} title={post.title} excerpt={post.excerpt} />
        ))}
      </div>
    </div>
  );
};

export default Home;

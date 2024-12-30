import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogEditor from './pages/BlogEditor';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="text-red-500 text-2xl">Test Tailwind</div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<BlogEditor />} />
      </Routes>
    </Router>
  );
}

export default App;

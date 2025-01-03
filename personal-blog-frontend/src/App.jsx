import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import BlogEditor from "./pages/BlogEditor";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/editor" element={<BlogEditor />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import BlogEditor from "./pages/BlogEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/editor" element={<BlogEditor />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4">
    <ul className="flex justify-around">
      <li><Link to="/" className="hover:underline">Home</Link></li>
      <li><Link to="/editor" className="hover:underline">Write Blog</Link></li>
    </ul>
  </nav>
);


export default Navbar;

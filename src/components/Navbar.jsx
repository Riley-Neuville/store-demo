import React from "react";
import "../css/nav.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <a href="#" className="logo">
          MyWebsite
        </a>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="/add">Add Product</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

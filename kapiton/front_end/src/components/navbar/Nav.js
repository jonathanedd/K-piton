import React from "react";
import { Link } from "react-router-dom";
import "../navbar/nav.css";

const Nav = () => {
  return (
    <div>
      <nav className="nav-container">
        <div className="nav-logo">
          <Link className="logo" to="/">
            Kápiton
          </Link>
        </div>
        <div className="nav-list">
          <a href="/">Products</a>
          <a href="/">Collections</a>
          <a href="/">Stores</a>
          <a href="/">Contact</a>
        </div>
      </nav>
    </div>
  );
};

export default Nav;

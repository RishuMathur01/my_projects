import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img src="/logo.png" alt="Green Basket Logo" />
      </div>

      <nav className="navbar__links">

        <Link to="/home">HOME</Link>
        <Link to="/product">PRODUCTS</Link>
        <Link to="/farmer">FARMERS</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to='/abUs'>ABOUT US</Link>

      </nav>

      <div className="navbar__search">
        <input type="text" placeholder="Search..." />
        <FaSearch className="search-icon" />
      </div>

      {/* <div className="navbar__buttons">
        <button className="btn">SIGN IN</button>
        <button className="btn">REGISTER</button>
      </div> */}
    </header>
  );
};

export default Navbar;


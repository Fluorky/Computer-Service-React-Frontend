import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/customerlist">CustomerList</Link></li>
        <li><Link to="/customercrud">CustomerListCrud</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/logoff">Logoff</Link></li>
      </ul>
    </nav> 
    
  
  );
}

export default Navbar;

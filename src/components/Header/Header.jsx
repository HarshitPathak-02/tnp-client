import React from 'react'
import "./Header.css"

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="navbar">
        <ul className="navbarr">
          <div className="navbarr-left">
            <img src="logo" alt=""/>
            <li><Link className='navbar-lnk' to="/">Home</Link></li>
            <li><Link className='navbar-lnk' to="/services">Services</Link></li>
            <li><Link className='navbar-lnk' to="/contactus">Contact Us</Link></li>
            <li><Link className='navbar-lnk' to="/about">About</Link></li>
          </div>
          <div className="login-signup">
            <Link className='navbar-lnk' to='/signin'>Login</Link>
            <Link className='navbar-lnk' to="/signup">Signup</Link>
          </div>
        </ul>
      </div>      
  )
}

export default Header
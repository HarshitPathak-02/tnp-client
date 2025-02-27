import React from 'react'
import "./Header.css"

import { Link } from 'react-router-dom'

import DemoLogo from "../../assets/images/demo-logo.webp"

const Header = () => {
  return (
    <div className="navbar">
        <ul className="navbarr">
          <div className="navbarr-left">
            <Link to="/"><img src={DemoLogo} alt=""/></Link>
            <li><Link className='navbar-lnk' to="/">Home</Link></li>
            <li><Link className='navbar-lnk' to="/tests">Tests</Link></li>
            <li><Link className='navbar-lnk' to="https://uitshivpuri.rgpv.ac.in/">UIT RGPV Shivpuri</Link></li>
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
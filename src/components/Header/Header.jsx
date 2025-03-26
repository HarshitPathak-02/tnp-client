import React, {useContext} from "react";
import "./Header.css";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import DemoLogo from "../../assets/images/demo-logo.webp";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const {user,setUser} = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogout = async ()=>{
    try {
      await axios.get("http://localhost:8000/logout")
      .then((response)=>{
        if(response.data.msg==="loggedOut"){
          setUser(null)
          navigate("/")
        }
      }).catch((err)=>{
        console.log(err);
      });
      // console.log(response.data);

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="navbar">
      <ul className="navbarr">
        <div className="navbarr-left">
          <Link to="/">
            <img src={DemoLogo} alt="" />
          </Link>
          <li>
            <Link className="navbar-lnk" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navbar-lnk" to="/tests">
              Tests
            </Link>
          </li>
          <li>
            <Link className="navbar-lnk" to="https://uitshivpuri.rgpv.ac.in/" target="_blank">
              UIT RGPV Shivpuri
            </Link>
          </li>
        </div>
        {user ? (
          <div className="login-signup">
            <Link className="navbar-lnk" onClick={handleLogout}>
              Logout
            </Link>
            <Link className="navbar-lnk" to="/student-dashboard">
              <i class="fa-solid fa-user"></i>
            </Link>
          </div>
        ) : (
          <div className="login-signup">
            <Link className="navbar-lnk" to="/signin">
              Login
              {user}
            </Link>
            <Link className="navbar-lnk" to="/signup">
              Signup
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Header;

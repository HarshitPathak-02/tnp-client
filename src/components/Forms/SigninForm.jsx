import React, { useContext, useState } from "react";
import "./Forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SigninImage from "../../assets/images/sigin-image.jpg";

const SigninForm = () => {
  const Navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/signin", formdata)
        .then((response) => {
          if (response.data.msg === "done") {
            setUser(response.data.user);
            Navigate("/");
          }
        })
        .catch((err) => {
          if (err.response.data === "Unauthorized") {
            alert("Wrong credentials");
          }
        });

      setFormdata({
        username: "",
        password: "",
      });

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="signin-form"
      style={{ backgroundImage: `url(${SigninImage})` }}
    >
      <div className="signin-overlay">
        <div className="signinforminside">

          <div className="signinforminside-right">
            <h2 className="form-heading">Welcome Back</h2>

            <form className="row g-3" onSubmit={submitHandler}>
              <div className="col-md-12">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={formdata.username}
                  name="username"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Password</label>

                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={formdata.password}
                    name="password"
                    onChange={handleChange}
                    required
                  />

                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="col-12">
                <button className="login-btn" type="submit">
                  Login
                </button>
              </div>

              {/* Register Link */}
              <div className="col-12 text-center">
                <p className="register-text">
                  Don't have an account?{" "}
                  <span onClick={() => Navigate("/signup")}>
                    Register
                  </span>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
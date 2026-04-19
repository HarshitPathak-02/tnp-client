import React, { useState } from "react";
import "./Forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm = () => {

  const Navigate = useNavigate()

  const [formdata, setFormdata] = useState({
    fullname:'',
    username:'',
    email:'',
    phone:'',
    branch:'',
    enrollment:'',
    college:'',
    password:'',
  })
    const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e)=>{
    e.preventDefault()

    const response = await axios.post('http://localhost:8000/signup', formdata)

    if(response.data.msg === 'registered') {
      Navigate("/")
    }

    setFormdata({
      fullname:'',
      username:'',
      email:'',
      phone:'',
      branch:'',
      enrollment:'',
      college:'',
      password:'',
    })
  
  }

  return (
    <div className="signup-form">
      <div className="signupforminside">

        {/* LEFT REMOVED */}

        <div className="signupforminside-right">
          <h2 className="form-heading">Create Your Account</h2>

          <form className="row g-3" onSubmit={submitHandler}>
            <div className="col-md-6">
              <label className="form-label">Fullname</label>
              <input type="text" className="form-control" name="fullname" value={formdata.fullname} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" name="username" value={formdata.username} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" name="phone" value={formdata.phone} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">College</label>
              <input type="text" className="form-control" name="college" value={formdata.college} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Branch</label>
              <input type="text" className="form-control" name="branch" value={formdata.branch} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Enrollment</label>
              <input type="text" className="form-control" name="enrollment" value={formdata.enrollment} onChange={handleChange} required />
            </div>

            <div className="col-md-12">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={formdata.email} onChange={handleChange} required />
            </div>

            <div className="col-md-12 password-field">
  <label className="form-label">Password</label>

  <div className="password-input-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      name="password"
      value={formdata.password}
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
              <button className="register-btn" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
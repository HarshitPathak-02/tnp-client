import React, { useState } from "react";
import "./Forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signupFormImage from "../../assets/images/signup-image.jpg"

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

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    // console.log(formdata.fullname);
  };

  const submitHandler = async (e)=>{
    e.preventDefault()

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

    const response = await axios.post('http://localhost:8000/signup', {
        fullname:formdata.fullname,
        username:formdata.username,
        email:formdata.email,
        phone:formdata.phone,
        branch:formdata.branch,
        enrollment:formdata.enrollment,
        college:formdata.college,
        password:formdata.password,
    })

    // console.log(response.data);

    if(response.data.msg === 'registered') {
      Navigate("/")
    }

  }


  return (
    <div className="signup-form">
      <div className="signupforminside">
      <div className="signupforminside-left">
      <img src={signupFormImage} alt="" />
      </div>
      <div className="signupforminside-right">

      <form className="row g-3" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">
            Fullname
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault01"
            value={formdata.fullname}
            name="fullname"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault02"
            value={formdata.username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefaultUsername" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefaultUsername"
            name="phone"
            value={formdata.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault03" className="form-label">
            College
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault03"
            value={formdata.college}
            name="college"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault03" className="form-label">
            Branch
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault03"
            value={formdata.branch}
            name="branch"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault03" className="form-label">
            Enrollment
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault03"
            value={formdata.enrollment}
            name="enrollment"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="validationDefault03" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="validationDefault03"
            value={formdata.email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="validationDefault03" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault03"
            value={formdata.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
};

export default SignupForm;

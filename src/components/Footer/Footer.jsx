import React, { useState } from "react";
import "./Footer.css";

import DemoLogo from "../../assets/images/demo-logo.webp";
import axios from "axios";

const Footer = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
    organization: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    // console.log(formdata.fullname);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormdata({
      name: "",
      email: "",
      message: "",
      organization: "",
      city: "",
    });

    try {
      await axios.post("http://localhost:8000/contact-us", {
        name: formdata.name,
        email: formdata.email,
        message: formdata.message,
        city: formdata.city,
        organization: formdata.organization,
      }).then((response)=>{
        if (response.data.msg === "contact-form-saved") {
          alert('mail send');
        }
      }).catch((err)=>{
        if(err.response.data==='Unauthorized'){
          alert("wrong")
        }
      });
    } catch (e) {

    }

  };

  return (
    <div className="mainfooter">
      <div className="mainfooter-upper">
        <div className="mainfooter-upper-left">
          <div className="mainfooter-upper-left-up">
            <img src={DemoLogo} alt="" />
            <h4>Training and Placement Cell</h4>
          </div>
          <div className="mainfooter-upper-left-mid">
            <h4>
              <i className="fa-solid fa-phone"></i> Call Us
            </h4>
            <h5>9102581472</h5>
          </div>
          <div className="mainfooter-upper-left-down">
            <h4>
              <i className="fa-solid fa-location-dot"></i> Find Us
            </h4>
            <h5>
              UIT RGPV Shivpuri, Satanwanda Kalan, Shivpuri, Madhya Pradesh
            </h5>
          </div>
          <div className="mainfooter-lower-left">
            <h5>
              <i className="fa-solid fa-copyright"></i> Quintellect 2025
            </h5>
          </div>
        </div>
        <div className="mainfooter-upper-right">
          <h2>Talk with Us !!</h2>
          <form
            className="row g-3 needs-validation form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formdata.name}
                onChange={handleChange}
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formdata.city}
                onChange={handleChange}
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="organization" className="form-label">
                Organization
              </label>
              <input
                type="text"
                className="form-control"
                id="organization"
                name="organization"
                value={formdata.organization}
                onChange={handleChange}
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-12">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <input
                type="text"
                className="form-control"
                id="message"
                name="message"
                value={formdata.message}
                onChange={handleChange}
                required
              />
              <div className="valid-feedback">Looks good!</div>
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

export default Footer;

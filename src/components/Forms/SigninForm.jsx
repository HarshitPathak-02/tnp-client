import React, { useContext, useState } from "react";
import "./Forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SigninForm = () => {
  const Navigate = useNavigate();

  const {setUser} = useContext(UserContext)

  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    // console.log(formdata.fullname);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setFormdata({
      username: "",
      password: "",
    });

    try {
      await axios.post("http://localhost:8000/signin", {
        username: formdata.username,
        password: formdata.password,
      }).then((response)=>{
        if (response.data.msg === "done") {
          setUser(response.data.user)
          Navigate("/");
          // console.log("signed in");
          // console.log(response.data.user);
        }
      }).catch((err)=>{
        if(err.response.data==='Unauthorized'){
          alert("wrong")
        }
      });
      // console.log(response.data);

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="signup-form">
      <form className="row g-3" onSubmit={submitHandler}>
        <div className="col-md-12">
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
  );
};

export default SigninForm;

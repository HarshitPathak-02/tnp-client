import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="box">
      {props.type === "company-card" && (
        <img src={props.image} alt="" className="box-img" />
      )}
      {props.type === "test-card" && (
        <div className="card test-card">
          <div className="card-body test-card-body">
            <h5 className="card-title test-card-title">{props.title}</h5>
            <p className="card-text ">{props.description}</p>
            <div className="test-card-charc">
              <p>
                Time
                <br />
                {props.time} <i className="fa-solid fa-clock"></i>
              </p>
              <p>
                Marks
                <br />
                {props.marks} <i className="fa-solid fa-marker"></i>
              </p>
              <p>
                Questions
                <br />
                {props.questions} <i className="fa-solid fa-question"></i>
              </p>
            </div>
            <Link to={props.path} className="btn btn-primary">
              <h6>Go somewhere</h6>
            </Link>
          </div>
        </div>
      )}
      {props.type === "student-card" && (
        <div className="student-card">
          <div className="student-img">
            <img src={props.image} alt="" id="student-img" />
          </div>
          <div className="student-card-desc">
            <div className="student-card-desc-info">
              <h4>{props.studentName}</h4>
              <h5>{props.studentCompany}</h5>
              <h6>{props.studentPackage}</h6>
            </div>
          </div>
        </div>
        // <div className="student-card">
        //   <div className="student-img">
        //     <img src={props.image} alt="" className="box-img" />
        //   </div>
        //   <div className="student-card-desc">
        //     <h4>{props.studentName}</h4>
        //     <h5>{props.studentCompany}</h5>
        //     <h6>{props.studentPackage}</h6>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default Card;

import React from "react";
import "./Card.css";

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
            <a href="#" className="btn btn-primary">
              <h6>Go somewhere</h6>
            </a>
          </div>
        </div>
      )}
      {props.type === "student-card" && (
        <div className="student-card">
          <img src={props.image} alt="" className="box-img" />
          <div className="student-card-desc">
            <h4>{props.studentName}</h4>
            <h5>{props.studentCompany}</h5>
            <h6>{props.studentPackage}</h6>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;

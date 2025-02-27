import React from "react";
import "./TestCard.css";
import Infosys from "../../assets/images/Infosys.png";

const TestCard = (props) => {
  return (
    <div className="test-card-main">
      <div className="card test-card">
        <div className="card-body test-card-body">
          <h5 className="card-title test-card-title">{props.title}</h5>
          <p className="card-text ">{props.description}</p>
          <div className="test-card-charc">
            <p>
              Time<br/>{props.time} <i className="fa-solid fa-clock"></i>
            </p>
            <p>
              Marks<br/>{props.marks} <i className="fa-solid fa-marker"></i>
            </p>
            <p>
              Questions<br/>{props.questions} <i className="fa-solid fa-question"></i>
            </p>
          </div>
          <a href="#" className="btn btn-primary">
            <h6>Go somewhere</h6>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestCard;

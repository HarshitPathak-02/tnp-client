import React from "react";
import "./TestCard.css";
import Infosys from "../../assets/images/Infosys.png"

const TestCard = () => {
  return (
    <div className="test-card-main">
      <div className="card test-card">
        <div className="card-body test-card-body">
          <h5 className="card-title test-card-title">tcs online assessment</h5>
          <p className="card-text ">
            check your ability by attempting aptitude , interview and coding questions.
          </p>
          <div className="test-card-charc">
            <p>time <br /> 60 min</p>
            <p>  marks <br />  120</p>
            <p>question <br /> 60</p>
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

import React from "react";
import "./Card.css"

const Card = (props) => {
  return (
    <div className="company-box">
      <img src={props.image} alt="" className="company-img" />
    </div>
  );
};

export default Card;

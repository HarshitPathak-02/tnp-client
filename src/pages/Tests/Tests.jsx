import React from "react";
import "./Tests.css";
import TestCard from ".././../components/TestCard/TestCard";

const Tests = () => {
  return (
    <div className="tests-main">
      <div className="tests-main-up">
        <h1>Our Tests</h1>
      </div>
      <div className="tests-main-mid">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Choose your company
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                TCS
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Infosys
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Accenture
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="tests-main-down">
        <div className="tests-main-down-up">
          <TestCard title="TCS online assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60"/>
          <TestCard title="TCS online assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60"/>
          <TestCard title="TCS online assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60"/>
        </div>
        <div className="tests-main-down-down">
        <TestCard title="TCS online assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60"/>
        <TestCard title="TCS online assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60"/>
        <TestCard title="TCS online assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60"/>
        </div>
      </div>
    </div>
  );
};

export default Tests;

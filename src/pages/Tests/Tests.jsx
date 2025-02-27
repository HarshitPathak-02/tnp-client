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
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="tests-main-down">
        <div className="tests-main-down-up">
          <TestCard />
          <TestCard />
          <TestCard />
        </div>
        <div className="tests-main-down-down">
          <TestCard />
          <TestCard />
          <TestCard />
        </div>
      </div>
    </div>
  );
};

export default Tests;

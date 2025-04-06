import React, { useState } from "react";
import "./Tests.css";
import Card from "../../components/Card/Card";

const Tests = () => {

  const [company, setCompany] = useState("");

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
              <a className="dropdown-item" style={{cursor:"pointer"}} onClick={(e)=>setCompany(e.currentTarget.innerHTML)}>
                TCS
              </a>
            </li>
            <li>
              <a className="dropdown-item" style={{cursor:"pointer"}} onClick={(e)=>setCompany(e.currentTarget.innerHTML)}>
                Infosys
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="tests-main-down">
        {company==="" && 
          <div className="tests-main-down-up">
            <div className="tests-main-down-up-land">
              <div className="tests-main-down-up-top">
                <Card title="TCS Aptitude Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/tcs/TCS Aptitude"/>
                <Card title="TCS Reasoning Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/tcs/TCS Reasoning"/>
                <Card title="TCS Coding Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/tcs/TCS Coding"/>
              </div>
              <div className="tests-main-down-up-down">
                <Card title="Infosys Aptitude Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/infosys/Infosys Aptitude"/>
                <Card title="Infosys Reasoning Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/infosys/Infosys Reasoning"/>
                <Card title="Infosys Coding Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/infosys/Infosys Coding"/>
              </div>
            </div>
          </div>
        }
        {company==="TCS" && 
          <div className="tests-main-down-up">
            <Card title="TCS Aptitude Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/tcs/TCS Aptitude"/>
            <Card title="TCS Reasoning Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/tcs/TCS Reasoning"/>
            <Card title="TCS Coding Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/tcs/TCS Coding"/>
          </div>
        }
        {company==="Infosys" && 
          <div className="tests-main-down-up">
            <Card title="Infosys Aptitude Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/infosys/Infosys Aptitude"/>
            <Card title="Infosys Reasoning Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/infosys/Infosys Reasoning"/>
            <Card title="Infosys Coding Assessment" description="Check your ability by attempting aptitude , interview and coding questions." time="60 min" marks="120" questions="60" type="test-card" path="/tests/infosys/Infosys Coding"/>
          </div>
        }
      </div>
    </div>
  );
};

export default Tests;

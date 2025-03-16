import React, { useEffect, useState } from "react";
import "./TestScreen.css";
import axios from "axios";

const TestScreen = () => {
  const [testData, setTestData] = useState([]);

  const getData = async () => {
    let data = await axios.get("http://localhost:8000/test-data");
    setTestData(data.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="test-screen">
      {testData.map((e) => {
        return (
          <div class="main-test-card">
            <div class="main-test-card-mid">
              <p>Q1. How many days in a Leap Year?</p>
              <h5>
                {" "}
                <button>356</button>
              </h5>
              <h5>
                {" "}
                <button>365</button>
              </h5>
              <h5>
                {" "}
                <button>366</button>
              </h5>
              <h5>
                {" "}
                <button>346</button>
              </h5>
            </div>
            <div class="main-test-card-lower">
              <h4>
                <button>Previous</button>
              </h4>
              <h4>
                <button>Next</button>
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestScreen;

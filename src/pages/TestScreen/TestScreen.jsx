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
              <p>q1 how many days in a leap year</p>
              <h5>
                {" "}
                <button>56</button>
              </h5>
              <h5>
                {" "}
                <button>56</button>
              </h5>
              <h5>
                {" "}
                <button>56</button>
              </h5>
              <h5>
                {" "}
                <button>56</button>
              </h5>
            </div>
            <div class="main-test-card-lower">
              <h4>
                <button>pre</button>
              </h4>
              <h4>
                <button>next</button>
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestScreen;

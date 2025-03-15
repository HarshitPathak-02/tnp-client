import React, { useEffect, useState } from "react";
import "./TestScreen.css"
import demo from "../../assets/images/Landscape-Color.jpg";
import axios from "axios";

const TestScreen = () => {
  const [testData, setTestData] = useState([]);

  return (
    <div className="test-screen">
        <h1>Test Karao Sajna!!</h1>
    </div>
  );
};

export default TestScreen;

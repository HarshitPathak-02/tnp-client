import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TestScreen.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const TestScreen = () => {
  const [testData, setTestData] = useState([]);
  const [iterator, setIterator] = useState(0);
  const [showTestData, setShowTestData] = useState({
    question: "",
    options: [],
  });
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const { company, testName } = useParams();

  const { user } = useContext(UserContext);

  const [userAnswers, setUserAnswers] = useState([])
  const [userAnswer, setUserAnswer] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/${company}/${testName}`
      );
      console.log("API Response:", response.data);

      if (response.data.data.length > 0) {
        setTestData(response.data.data);
      } else {
        console.warn("No test data received from backend.");
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  const setCorrectAnswersArray = () => {
    testData.forEach((item) => {
      console.log("items", item.correct_option);
    });
  };

  useEffect(() => {
    setCorrectAnswersArray();
  }, [testData]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (testData.length > 0) {
      setShowTestData(testData[iterator]);
    }
  }, [iterator, testData]);

  const handleNextClick = () => {
    if (userAnswer !== "") {
      if (iterator < testData.length - 1) {
        setIterator((prev) => prev + 1);
      }
      setUserAnswers([...userAnswers, userAnswer]); // Store current answer before moving to next
      setUserAnswer(""); // Reset userAnswer for next question
      console.log(userAnswers);
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const handlePrevClick = () => {
    if (iterator > 0) {
      setIterator((prev) => prev - 1);
    }
  };

  // Function to calculate score
  const calculateScore = () => {
    let score = 0;
    testQuestions.forEach((question, index) => {
      if (userAnswers[index] === correctAnswers[index]) {
        score += 20; // Each correct answer = 20 marks
      }
    });
    return score;
  };

  const handleSubmit = async (comp, tstName) => {
    try {
      // Get current date and time
      console.log("user enrollment", user.enrollment);
      const now = new Date();
      const currentDate = now.toISOString(); // Stores full date in ISO format
      const currentTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }); // Example: "10:30 AM"

      // Send the result to the backend
      const response = await axios.post("http://localhost:8000/test/submit", {
        enrollment: user.enrollment,
        marks: 54,
        company: comp,
        testName: tstName,
        date: currentDate, // Send date in ISO format
        time: currentTime, // Send time in "HH:MM AM/PM" format
      });

      console.log("Test result submitted:", response.data);
      alert("Test submitted successfully!");
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit test.");
    }
  };

  return (
    <div className="test-screen">
      <div className="main-test-card">
        <form id="TCS Question" onSubmit={(e) => e.preventDefault()}>
          <div className="main-test-card-mid">
            <h3>{showTestData.question}</h3>
            <label className="option">
              <input
                type="radio"
                name="q"
                value={showTestData.options[0]}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                }}
              />
              {showTestData.options[0]}
            </label>
            <label className="option">
              <input
                type="radio"
                name="q"
                value={showTestData.options[1]}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                }}
              />
              {showTestData.options[1]}
            </label>
            <label className="option">
              <input
                type="radio"
                name="q"
                value={showTestData.options[2]}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                }}
              />
              {showTestData.options[2]}
            </label>
            <label className="option">
              <input
                type="radio"
                name="q"
                value={showTestData.options[3]}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                }}
              />
              {showTestData.options[3]}
            </label>
          </div>
        </form>
        <div className="main-test-card-lower">
          <h4>
            <button disabled={iterator === 0} onClick={handlePrevClick}>
              Previous
            </button>
          </h4>
          <h4>
            {iterator >= testData.length - 1 ? (
              <button onClick={() => handleSubmit(company, testName)}>
                Submit
              </button>
            ) : (
              <button
                disabled={iterator >= testData.length - 1}
                onClick={handleNextClick}
              >
                Next
              </button>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TestScreen;

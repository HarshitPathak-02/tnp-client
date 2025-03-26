import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TestScreen.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Modal, Button } from "react-bootstrap";

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

  const [isModal, setIsModalOpen] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/${company}/${testName}`
      );
      console.log("API Response:", response.data);

      if (response.data.data.length > 0) {
        setTestData(response.data.data);
        setCorrectAnswers(response.data.data.map((q) => q.correct_option));
      } else {
        console.warn("No test data received from backend.");
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  const setCorrectAnswersArray = () => {
    correctAnswers.forEach((item) => {
      console.log("items", item);
    });
  };

  useEffect(() => {
    setCorrectAnswersArray();
  }, [correctAnswers]);

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
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        console.log("it1",iterator);
        updatedAnswers[iterator] = userAnswer;
        console.log("it2",iterator); // Store answer in correct index
        return updatedAnswers;
      });

      // userAnswersTemp[iterator] = userAnswer;

      // setUserAnswers(userAnswersTemp)

      console.log(userAnswers);

      setUserAnswer(""); // Reset input for the next question

      if (iterator < testData.length - 1) {
        setIterator((prev) => prev + 1);
      }
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
    let score = 0
    userAnswers.forEach((answer, index) => {
      if (answer && correctAnswers[index] && answer === correctAnswers[index]) {
        score+=20; // Assuming each correct answer is worth 20 marks
      }
    });
    setScore(score);
    return score;
  };

  const handleSubmit = async (comp, tstName) => {
    try {
      // if (userAnswer !== "") {
      //   setUserAnswers((prevAnswers) => {
      //     const updatedAnswers = [...prevAnswers];
      //     updatedAnswers[iterator] = userAnswer; // Store last answer
      //     return updatedAnswers;
      //   });
      // }

      // console.log(userAnswers);

      setTimeout(async () => {
        const score = calculateScore();
        console.log(score);
      }, 100);

      // Get current date and time
      // console.log("user enrollment", user.enrollment);
      // const now = new Date();
      // const currentDate = now.toISOString().split("T")[0]; // Stores full date in ISO format
      // const currentTime = now.toLocaleTimeString("en-US", {
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   hour12: true,
      // }); // Example: "10:30 AM"

      // // Send the result to the backend
      // const response = await axios.post("http://localhost:8000/test/submit", {
      //   username: user.username,
      //   marks: 54,
      //   company: comp,
      //   testName: tstName,
      //   date: currentDate, // Send date in ISO format
      //   time: currentTime, // Send time in "HH:MM AM/PM" format
      // });

      // console.log("Test result submitted:", response.data);

      setIsModalOpen(true)
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
            {showTestData.options.map((option, index) => (
              <label key={index} className="option">
                <input
                  type="radio"
                  name="q"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => {
                    setUserAnswer(e.target.value)
                    e.target.value = ""
                  }}
                />
                {option}
              </label>
            ))}
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
      <Modal show={isModal} onHide={() => setIsModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Test Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your test has been successfully submitted. You got {score}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TestScreen;

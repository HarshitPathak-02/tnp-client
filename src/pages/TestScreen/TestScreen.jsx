import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TestScreen.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Modal, Button } from "react-bootstrap";
// import { Quiz } from "react-quiz-component";

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

  const [isModal, setIsModalOpen] = useState(true); // Show start modal initially
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);

  const [remainingTime, setRemainingTime] = useState(60 * 1); // 1 hour
  const [timerStarted, setTimerStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Prevent double submission

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/${company}/${testName}`
      );
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("usersArray:", userAnswers);
  }, [userAnswers]);

  useEffect(() => {
    if (!user || !user.username) {
      // alert("You must be logged in to perform the test.");
      navigate("/signin"); // redirect to login page
    }
  }, [user, navigate]);

  useEffect(() => {
    if (testData.length > 0) {
      setShowTestData(testData[iterator]);
    }
  }, [iterator, testData]);

  useEffect(() => {
    let interval;
    if (timerStarted && !submitted) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            console.log("score 0 ni aana chiye yr");
            console.log("submitted kya h:", submitted);
            handleSubmit(company, testName);
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted, submitted]);

  const formatTime = (timeInSeconds) => {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleNextClick = () => {
    if (userAnswer !== "") {
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[iterator] = userAnswer;
        return updatedAnswers;
      });
      setUserAnswer("");
      if (iterator < testData.length - 1) {
        setIterator((prev) => prev + 1);
      }
      setAttemptedQuestions((prev) => prev + 1);
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const handlePrevClick = () => {
    if (iterator > 0) {
      setIterator((prev) => prev - 1);
      setAttemptedQuestions((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer && correctAnswers[index] && answer === correctAnswers[index]) {
        score += 20;
      }
    });
    setScore(score);
    return score;
  };

  const handleSubmit = async (comp, tstName) => {
    if (submitted) return;
    setSubmitted(true);

    const updatedAnswers = [...userAnswers];
    if (userAnswer !== "") {
      updatedAnswers[iterator] = userAnswer;
      setUserAnswers(updatedAnswers);
    }

    let finalScore = 0;
    updatedAnswers.forEach((answer, index) => {
      if (answer && correctAnswers[index] && answer === correctAnswers[index]) {
        finalScore += 20;
      }
    });
    setScore(finalScore);
    setIsModalOpen(true);

    try {
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];
      const currentTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const response = await axios.post("http://localhost:8000/submit", {
        username: user.username,
        marks: finalScore,
        company: comp,
        testName: tstName,
        date: currentDate,
        time: currentTime.toString().split("T")[0],
        answers: updatedAnswers,
      });

      console.log("Test result submitted:", response.data);
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit test.");
    }
  };

  return (
    <div className="test-screen">
      <div className="test-screen-question">
        <div className="main-test-card">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="main-test-card-mid">
              <h3>{showTestData.question}</h3>
              {showTestData.options.map((option, index) => (
                <label key={index} className="option">
                  <input
                    type="radio"
                    name="q"
                    value={option}
                    checked={userAnswer === option}
                    onChange={(e) => setUserAnswer(e.target.value)}
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
                <button onClick={handleNextClick}>Next</button>
              )}
            </h4>
          </div>
        </div>
      </div>
      <div className="test-screen-metrics">
        <div className="test-screen-metrics-heading">
          <h2>Test Name</h2>
        </div>
        <div className="test-screen-metrics-data">
          <div className="test-screen-metrics-time-total">
            <p>
              <b>Total Time</b>
            </p>
            <p>60:00</p>
          </div>
          <div className="test-screen-metrics-time-remaining">
            <p>
              <b>Remaining Time</b>
            </p>
            <p>{formatTime(remainingTime)}</p>
          </div>
          <div className="test-screen-metrics-questions-total">
            <p>
              <b>Total Questions</b>
            </p>
            <p>{testData.length}</p>
          </div>
          <div className="test-screen-metrics-questions-attempted">
            <p>
              <b>Attempted Questions</b>
            </p>
            <p>{attemptedQuestions}</p>
          </div>
        </div>
      </div>

      {/* Initial Start Test Modal */}
      <Modal
        show={isModal && !timerStarted}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Start Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ready to begin the test? You will have 1 hour.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setIsModalOpen(false);
              setTimerStarted(true);
            }}
          >
            Start Test
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Submission Result Modal */}
      <Modal
        show={isModal && timerStarted && submitted}
        onHide={() => setIsModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Test Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your test has been successfully submitted. You got {score} marks.
        </Modal.Body>
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

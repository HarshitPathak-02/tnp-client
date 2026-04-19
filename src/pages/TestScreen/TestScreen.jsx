import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./TestScreen.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Modal, Button } from "react-bootstrap";
import CodingTest from "../../components/CodingTest/CodingTest";

const TestScreen = () => {
  const [testData, setTestData] = useState([]);
  const [iterator, setIterator] = useState(0);
  const [showTestData, setShowTestData] = useState({
    question: "",
    options: [],
  });
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const { company, testName } = useParams();
  const location = useLocation();

  // ✅ SOLUTION MODE
  const solutionMode = location.state?.mode === "solution";
  const resultId = location.state?.resultId;

  const testType = location.state?.testType;
  const isReviewMode = location.state?.isReviewMode || false;

  const { user } = useContext(UserContext);

  const [isModal, setIsModalOpen] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [resultData, setResultData] = useState(null);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);

  const [remainingTime, setRemainingTime] = useState(60 * 1);
  const [timerStarted, setTimerStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const isCodingTest =
    testType === "coding" || testName.toLowerCase().includes("coding");

  // 🔥 FETCH QUESTIONS
  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/${company}/${testName}`,
      );
      if (response.data.data.length > 0) {
        setTestData(response.data.data);
        setCorrectAnswers(response.data.data.map((q) => q.correct_option));
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  // 🔥 FETCH RESULT (FOR SOLUTION MODE)
  const fetchResultData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/test-analysis/${resultId}`,
      );

      const result = res.data.data;

      const userAns = result.answers.map((a) => a.selected);
      const correctAns = result.answers.map((a) => a.correct);

      setUserAnswers(userAns);
      setCorrectAnswers(correctAns);
    } catch (err) {
      console.error("Error fetching result:", err);
    }
  };

  useEffect(() => {
    if (!isCodingTest) {
      getData(); // always fetch questions
    }

    if (solutionMode && resultId) {
      fetchResultData(); // fetch answers
    }
  }, []);

  useEffect(() => {
    if (!user || !user.username) {
      navigate("/signin");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (testData.length > 0) {
      setShowTestData(testData[iterator]);
    }
  }, [iterator, testData]);

  useEffect(() => {
    if (isReviewMode && resultId) {
      axios
        .get(`http://localhost:8000/test-analysis/${resultId}`)
        .then((res) => {
          setResultData(res.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [isReviewMode, resultId]);

  // ✅ SYNC CURRENT ANSWER IN SOLUTION MODE
  // 🔥 SET USER ANSWER IN REVIEW MODE
  useEffect(() => {
    if (isReviewMode && resultData?.answers?.length > 0) {
      const current = resultData.answers[iterator];
      if (current) {
        setUserAnswer(current.selected); // ✅ THIS FIXES HIGHLIGHT
      }
    }
  }, [iterator, isReviewMode, resultData]);

  // 🔥 TIMER (DISABLED IN SOLUTION MODE)
  useEffect(() => {
    let interval;
    if (timerStarted && !submitted && !solutionMode) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            handleSubmit(company, testName);
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted, submitted, solutionMode]);

  const formatTime = (timeInSeconds) => {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleNextClick = () => {
    if (userAnswer !== "") {
      setUserAnswers((prev) => {
        const updated = [...prev];
        updated[iterator] = userAnswer;
        return updated;
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
      if (answer && answer === correctAnswers[index]) {
        finalScore += 20;
      }
    });

    setScore(finalScore);
    setIsModalOpen(true);

    try {
      const formattedAnswers = testData.map((q, index) => ({
        questionId: q._id,
        selected: updatedAnswers[index] || "",
        correct: q.correct_option,
      }));

      const now = new Date();

      await axios.post("http://localhost:8000/submit", {
        username: user.username,
        marks: finalScore,
        company: comp,
        testName: tstName,
        test_type: "mcq",
        answers: formattedAnswers,
        date: now,
        time: now.toLocaleTimeString(),
      });
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  // 🔥 CODING
  if (isCodingTest) {
    return <CodingTest company={company} testName={testName} user={user} />;
  }

  return (
    <div className="test-screen">
      <div className="test-screen-question">
        <div className="main-test-card">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="main-test-card-mid">
              <h3>{showTestData.question}</h3>

              {showTestData.options.map((option, index) => (
                <label
                  key={index}
                  className={`option ${
                    solutionMode
                      ? option === correctAnswers[iterator]
                        ? "correct"
                        : userAnswers[iterator] === option &&
                            option !== correctAnswers[iterator]
                          ? "wrong"
                          : ""
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="q"
                    disabled={isReviewMode}
                    value={option}
                    checked={
                      solutionMode
                        ? userAnswers[iterator] === option
                        : userAnswer === option
                    }
                    onChange={(e) => {
                      if (!solutionMode) setUserAnswer(e.target.value);
                    }}
                  />
                  {option}
                </label>
              ))}

              {solutionMode && (
                <p className="correct-answer">
                  Correct Answer: <b>{correctAnswers[iterator]}</b>
                </p>
              )}
            </div>
          </form>

          {/* ✅ NAVIGATION ALWAYS AVAILABLE */}
          <div className="main-test-card-lower">
            <button disabled={iterator === 0} onClick={handlePrevClick}>
              Previous
            </button>

            {!solutionMode ? (
              iterator >= testData.length - 1 ? (
                <button onClick={() => handleSubmit(company, testName)}>
                  Submit
                </button>
              ) : (
                <button onClick={handleNextClick}>Next</button>
              )
            ) : (
              <button
                disabled={iterator >= testData.length - 1}
                onClick={() => setIterator((prev) => prev + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ HIDE TIMER */}
      {!solutionMode && (
        <div className="test-screen-metrics">
          <h2>Test Name</h2>
          <p>Total Time: 60:00</p>
          <p>Remaining Time: {formatTime(remainingTime)}</p>
          <p>Total Questions: {testData.length}</p>
          <p>Attempted: {attemptedQuestions}</p>
        </div>
      )}

      {/* START MODAL */}
      {!solutionMode && (
        <Modal
          show={isModal && !timerStarted}
          backdrop="static"
          keyboard={false}
          centered
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>Test Instructions</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Back
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(false);
                setTimerStarted(true);
              }}
            >
              Start
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default TestScreen;

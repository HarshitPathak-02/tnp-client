import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CodingTest.css";

const CodingTest = ({ company, testName, user }) => {
  // const { company, testName } = useParams();

  const [submitted, setSubmitted] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);

  const [codes, setCodes] = useState([]); // store code per question
  const [code, setCode] = useState("// Write your code here");

  const [output, setOutput] = useState("");
  const [results, setResults] = useState([]);

  const [remainingTime, setRemainingTime] = useState(60 * 60);
  const [timerStarted, setTimerStarted] = useState(true);

  // 🔥 Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/coding/${company}/${testName}`,
        );

        setQuestions(res.data.data);

        // initialize code array
        setCodes(
          new Array(res.data.data.length).fill("// Write your code here"),
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, [company, testName]);

  // 🔥 Load code when question changes
  useEffect(() => {
    if (codes.length > 0) {
      setCode(codes[currentQ]);
    }
  }, [currentQ, codes]);

  // 🔥 Timer
  useEffect(() => {
    let interval;

    if (timerStarted) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            if (!submitted) {
              // ✅ ADD THIS CHECK
              console.log("⏰ Auto Submit Triggered");
              handleSubmit();
            }
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerStarted, submitted]); // ✅ ADD submitted here

  const formatTime = (time) => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  // 🔥 Save code before switching
  const saveCode = () => {
    setCodes((prev) => {
      const updated = [...prev];
      updated[currentQ] = code;
      return updated;
    });
  };

  // 🔥 Run code
  const handleRun = async () => {
    try {
      const res = await axios.post("http://localhost:8000/run-code", {
        code,
        language: 63,
      });

      setOutput(res.data.stdout || res.data.stderr);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Evaluate single question
  const evaluateQuestion = async (question, userCode) => {
    let passed = 0;

    const allTests = [
      ...(question.sampleTestCases || []),
      ...(question.hiddenTestCases || []),
    ];

    for (let test of allTests) {
      try {
        const res = await axios.post("http://localhost:8000/run-code", {
          code: userCode,
          language: 63,
          input: test.input, // 🔥 important
        });

        const output = res.data.stdout?.trim();

        if (output === test.output) {
          passed++;
        }
      } catch (err) {
        console.error(err);
      }
    }

    return {
      passed,
      total: allTests.length,
    };
  };

  // 🔥 Submit Test
  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);

    const updatedCodes = [...codes];
    updatedCodes[currentQ] = code;

    let finalCodingAnswers = [];
    let totalMarks = 0;

    for (let i = 0; i < questions.length; i++) {
      const res = await evaluateQuestion(questions[i], updatedCodes[i]);

      finalCodingAnswers.push({
        questionId: questions[i]._id,
        code: updatedCodes[i],
        passed: res.passed,
        total: res.total,
      });

      // marks calculation
      const qMarks = questions[i].marks || 100;
      totalMarks += (res.passed / res.total) * qMarks;
    }

    try {
      await axios.post("http://localhost:8000/submit", {
        username: user.username,
        testName,
        company,
        test_type: "coding",
        codingAnswers: finalCodingAnswers,
        marks: Math.round(totalMarks),
      });

      alert("Coding Test Submitted ✅");
    } catch (err) {
      console.error(err);
    }
  };

  if (!questions || questions.length === 0) {
    return <h2>Loading questions...</h2>;
  }

  const question = questions[currentQ];

  return (
    <div className="coding-container">
      {/* LEFT SIDE → QUESTION */}
      <div className="question-panel">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{question.question}</h2>
          <div style={{ marginTop: "15px" }}>
            <button
              onClick={() => {
                console.log("Button clicked"); // 👈 check this
                handleSubmit();
              }}
              disabled={submitted}
              style={{
                background: "red",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit Test
            </button>
          </div>
        </div>

        <p>
          <b>Description:</b> {question.description}
        </p>
        <p>
          <b>Input:</b> {question.input_format}
        </p>
        <p>
          <b>Output:</b> {question.output_format}
        </p>

        <div className="sample-box">
          <h4>Sample Input</h4>
          <pre>{question.sample_input}</pre>
        </div>

        <div className="sample-box">
          <h4>Sample Output</h4>
          <pre>{question.sample_output}</pre>
        </div>

        {/* Navigation */}
        <div className="nav-buttons">
          <button
            disabled={currentQ === 0}
            onClick={() => {
              saveCode();
              setCurrentQ((prev) => prev - 1);
            }}
          >
            Previous
          </button>

          {currentQ === questions.length - 1 ? (
            <>
              <button onClick={handleSubmit} className="submit-btn">
                Submit Test
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                saveCode();
                setCurrentQ((prev) => prev + 1);
              }}
            >
              Next
            </button>
          )}
        </div>

        {/* Timer */}
        <h3>⏳ Time Left: {formatTime(remainingTime)}</h3>
      </div>

      {/* RIGHT SIDE → IDE */}
      <div className="editor-panel">
        <Editor
          height="400px"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />

        <button className="run-btn" onClick={handleRun}>
          ▶ Run Code
        </button>

        <div className="output-box">
          <h3>Output</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodingTest;

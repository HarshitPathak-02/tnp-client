import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TestAnalysis.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const TestAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const test = location.state?.test; // 🔥 full test object from dashboard

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#00C49F", "#FF4C4C"];

  // 🔥 Fetch full test using ID
  useEffect(() => {
    if (!test?._id) return;

    const fetchTest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/test-analysis/${test._id}`
        );
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [test]);

  if (!test) return <h2>No test data received</h2>;
  if (loading) return <h2>Loading analysis...</h2>;
  if (!data) return <h2>No data found</h2>;

  // 🔥 Parse AI
  let parsedAI = null;
  try {
    parsedAI = JSON.parse(data.aiAnalysis);
  } catch (e) {}

  const isCoding = data.test_type === "coding";

  // =========================
  // MCQ ANALYSIS
  // =========================
  let total = 0;
  let correct = 0;
  let wrong = 0;
  let accuracy = 0;
  let accuracyData = [];

  if (!isCoding && data.answers) {
    total = data.answers.length;
    correct = data.answers.filter(
      (a) => a.selected === a.correct
    ).length;
    wrong = total - correct;
    accuracy = total ? ((correct / total) * 100).toFixed(2) : 0;

    accuracyData = [
      { name: "Correct", value: correct },
      { name: "Wrong", value: wrong },
    ];
  }

  // =========================
  // CODING ANALYSIS
  // =========================
  let codingData = [];
  let totalPassed = 0;
  let totalTestCases = 0;

  if (isCoding && data.codingAnswers) {
    codingData = data.codingAnswers.map((q, i) => ({
      name: `Q${i + 1}`,
      passed: q.passed,
      total: q.total,
    }));

    data.codingAnswers.forEach((q) => {
      totalPassed += q.passed;
      totalTestCases += q.total;
    });

    accuracy = totalTestCases
      ? ((totalPassed / totalTestCases) * 100).toFixed(2)
      : 0;

    accuracyData = [
      { name: "Passed", value: totalPassed },
      { name: "Failed", value: totalTestCases - totalPassed },
    ];
  }

  return (
    <div className="test-analysis-container">
      {/* HEADER */}
      <div className="test-analysis-header">
        <h1>{data.test_name} Analysis</h1>
        <p><b>Company:</b> {data.company}</p>
        <p><b>Marks:</b> {data.marks}</p>
        <p><b>Type:</b> {data.test_type}</p>
      </div>

      {/* 🔥 VIEW SOLUTIONS BUTTON */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() =>
            navigate(`/tests/${data.company}/${data.test_name}`, {
              state: {
                isReviewMode: true,
                resultId: data._id,
                company: data.company,
                testName: data.test_name,
                testType: data.test_type,
                mode:'solution'
              },
            })
          }
          style={{
            padding: "10px 15px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🔍 View Solutions
        </button>
      </div>

      {/* STATS */}
      <div className="test-analysis-stats">
        <div className="stat-card">
          <h3>Total Questions</h3>
          <p>{isCoding ? data.codingAnswers?.length : data.answers?.length}</p>
        </div>

        <div className="stat-card">
          <h3>{isCoding ? "Passed Cases" : "Correct Answers"}</h3>
          <p>{isCoding ? totalPassed : correct}</p>
        </div>

        <div className="stat-card">
          <h3>Accuracy</h3>
          <p>{accuracy}%</p>
        </div>
      </div>

      {/* PIE */}
      <PieChart width={300} height={250}>
        <Pie data={accuracyData} dataKey="value" outerRadius={80} label>
          {accuracyData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* AI */}
      <div className="ai-analysis-section">
        <h2>🤖 AI Analysis</h2>

        {parsedAI ? (
          <>
            <h3>✅ Strengths</h3>
            <ul>{parsedAI.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>

            <h3>⚠️ Weaknesses</h3>
            <ul>{parsedAI.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>

            <h3>⏱️ Time Analysis</h3>
            <p>{parsedAI.timeAnalysis || "Not available"}</p>

            <h3>🎯 Accuracy Analysis</h3>
            <p>{parsedAI.accuracyAnalysis || `${accuracy}%`}</p>

            <h3>🏆 Exam Readiness</h3>
            <p>{parsedAI.examReadiness}</p>
          </>
        ) : (
          <p>AI analysis not available</p>
        )}
      </div>
    </div>
  );
};

export default TestAnalysis;
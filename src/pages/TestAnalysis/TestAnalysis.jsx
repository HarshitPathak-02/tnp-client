import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { id } = useParams(); // test id from URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const COLORS = ["#00C49F", "#FF4C4C"];

  // 🔹 Fetch test data
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/test-analysis/${id}`,
        );
        console.log("ressss:", res.data);
        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching test analysis:", err);
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  if (loading) return <h2>Loading analysis...</h2>;
  if (!data) return <h2>No data found</h2>;

  // 🔥 ADD HERE
  let parsedAI = null;

  try {
    parsedAI = JSON.parse(data.aiAnalysis);
  } catch (e) {
    console.error("AI parse error", e);
  }
  console.log("Test Analysis Data:", data);
  // ✅ Accuracy
  const total = data.answers.length;
  const correct = data.answers.filter(
    (a) => a.selected === a.correct,
  ).length;
  const wrong = total - correct;
  const accuracy = ((correct / total) * 100).toFixed(2);

  // ✅ Pie data
  const accuracyData = [
    { name: "Correct", value: correct },
    { name: "Wrong", value: wrong },
  ];

  // ✅ Time per question
  const timeData = data.answers.map((q, i) => ({
    name: `Q${i + 1}`,
    time: q.timeTaken,
  }));

  // ✅ Time distribution
  const timeBuckets = {
    "0-10s": 0,
    "10-20s": 0,
    "20-30s": 0,
    "30s+": 0,
  };

  data.answers.forEach((q) => {
    if (q.timeTaken <= 10) timeBuckets["0-10s"]++;
    else if (q.timeTaken <= 20) timeBuckets["10-20s"]++;
    else if (q.timeTaken <= 30) timeBuckets["20-30s"]++;
    else timeBuckets["30s+"]++;
  });

  const timeDistributionData = Object.entries(timeBuckets).map(
    ([range, count]) => ({
      range,
      count,
    }),
  );

  return (
    <div className="test-analysis-container">
      {/* 🔹 HEADER */}
      <div className="test-analysis-header">
        <h1>{data.test_name} Analysis</h1>
        <p>
          <b>Company:</b> {data.company}
        </p>
        <p>
          <b>Marks:</b> {data.marks}
        </p>
      </div>

      {/* 🔹 BASIC STATS */}
      <div className="test-analysis-stats">
        <div className="stat-card">
          <h3>Total Questions</h3>
          <p>{data.answers?.length}</p>
        </div>

        <div className="stat-card">
          <h3>Correct Answers</h3>
          <p>{data.answers?.filter((a) => a.selected === a.correct).length}</p>
        </div>

        <div className="stat-card">
          <h3>Accuracy</h3>
          <p>
            {(
              (data.answers?.filter((a) => a.selected === a.correct).length /
                data.answers?.length) *
              100
            ).toFixed(2)}
            %
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* 🔹 Accuracy Pie */}
        <div>
          <h3>Accuracy</h3>
          <PieChart width={300} height={250}>
            <Pie data={accuracyData} dataKey="value" outerRadius={80} label>
              {accuracyData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* 🔹 Time Distribution */}
        <div>
          <h3>Time Distribution</h3>
          <BarChart width={350} height={250} data={timeDistributionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Time per Question</h3>

        <BarChart width={600} height={300} data={timeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="time" />
        </BarChart>
      </div>

      {/* 🔹 RAW AI ANALYSIS (TEMP) */}
      <div className="ai-analysis-section">
        <h2>🤖 AI Analysis</h2>

        {parsedAI ? (
          <>
            {/* Strengths */}
            <div>
              <h3>✅ Strengths</h3>
              <ul>
                {parsedAI.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <h3>⚠️ Weaknesses</h3>
              <ul>
                {parsedAI.weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            {/* Time Analysis */}
            <div>
              <h3>⏱️ Time Analysis</h3>
              <p>{parsedAI.timeAnalysis}</p>
            </div>

            {/* Accuracy Analysis */}
            <div>
              <h3>🎯 Accuracy Analysis</h3>
              <p>{parsedAI.accuracyAnalysis}</p>
            </div>

            {/* Exam Readiness */}
            <div>
              <h3>🏆 Exam Readiness</h3>
              <p>{parsedAI.examReadiness}</p>
            </div>

            {/* Tips */}
            <div>
              <h3>💡 Improvement Tips</h3>
              <ul>
                {parsedAI.improvementTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Focus Topics */}
            <div>
              <h3>📚 Focus Topics</h3>
              <ul>
                {parsedAI.recommendedFocusTopics.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>AI analysis could not be parsed.</p>
        )}
      </div>
    </div>
  );
};

export default TestAnalysis;

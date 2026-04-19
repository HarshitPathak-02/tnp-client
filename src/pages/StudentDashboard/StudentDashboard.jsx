import React, { useContext, useState, useEffect } from "react";
import "./StudentDashboard.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [testData, setTestData] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

  const getTestHistory = async () => {
    await axios
      .get(`http://localhost:8000/test-history/?username=${user.username}`)
      .then((response) => {
        setTestData(response.data.data);
      });
  };

  useEffect(() => {
    getTestHistory();
  }, []);

  useEffect(() => {
    console.log("testData:", testData);
  });

  // 🧠 SUBJECT-WISE ANALYSIS
  const getSubjectWiseAnalysis = () => {
    const subjectMap = {};

    testData.forEach((test) => {
      let subject = "Other";
      const name = test.test_name.toLowerCase();

      if (name.includes("quant") || name.includes("aptitude")) {
        subject = "Aptitude";
      } else if (name.includes("reason")) {
        subject = "Reasoning";
      } else if (name.includes("coding") || name.includes("code")) {
        subject = "Coding";
      }

      if (!subjectMap[subject]) {
        subjectMap[subject] = {
          marks: [],
        };
      }

      subjectMap[subject].marks.push(Number(test.marks));
    });

    // 🔥 Convert into analysis
    return Object.entries(subjectMap).map(([subject, val]) => {
      const marksArr = val.marks;
      const totalTests = marksArr.length;

      const avg = marksArr.reduce((a, b) => a + b, 0) / totalTests;

      // 📉 Variance (consistency)
      const variance =
        marksArr.reduce((sum, m) => sum + Math.pow(m - avg, 2), 0) / totalTests;

      const stdDev = Math.sqrt(variance);

      // ⚠️ Low attempt penalty
      const lowAttemptPenalty = totalTests < 2 ? 20 : 0;

      // 🧠 Weakness score
      const weaknessScore =
        (100 - avg) * 0.5 + stdDev * 0.3 + lowAttemptPenalty * 0.2;

      return {
        subject,
        avgMarks: Math.round(avg),
        totalTests,
        stdDev: Math.round(stdDev),
        weaknessScore: Math.round(weaknessScore),
      };
    });
  };

  const subjectData = getSubjectWiseAnalysis().map((item) => ({
    subject: item.subject,
    avgMarks: item.avgMarks,
  }));

  // 🧠 FIND WEAK SUBJECT
  const getWeakSubject = () => {
    const data = getSubjectWiseAnalysis();

    if (data.length === 0) return "No Data";

    // ❗ Ignore subjects with only 1 test (optional strict mode)
    const filtered = data.filter((d) => d.totalTests >= 2);

    if (filtered.length === 0) return "Not enough data";

    const weakest = filtered.reduce((max, curr) =>
      curr.weaknessScore > max.weaknessScore ? curr : max,
    );

    return weakest.subject;
  };

  // 📊 PERFORMANCE OVER TIME
  const performanceData = testData
    .map((item) => ({
      date: new Date(item.date).toISOString().split("T")[0],
      marks: Number(item.marks),
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by date
  return (
    <div className="dashboard">
      {/* MAIN */}
      <div className="main-dashboard">
        <h2 className="title">{user.fullname}</h2>

        {/* CARDS */}
        <div className="cards-dashboard">
          <div className="card purple card-dashboard">
            <h3 style={{ color: "white" }}>Enrollment</h3>
            <h4>{user.enrollment}</h4>
          </div>

          <div className="card blue card-dashboard">
            <h3 style={{ color: "white" }}>Branch</h3>
            <h4>{user.branch}</h4>
          </div>

          <div className="card orange card-dashboard">
            <h3 style={{ color: "white" }}>Email</h3>
            <h4>{user.email}</h4>
          </div>

          <div className="card green card-dashboard">
            <h3 style={{ color: "white" }}>College</h3>
            <h4 style={{ color: "white" }}> {user.college}</h4>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="middle-dashboard">
          {/* BAR CHART PLACEHOLDER */}
          <div className="chart-box">
            <h3>All Exam Result</h3>
            {performanceData.length > 0 ? (
              <BarChart width={700} height={450} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="marks" fill="#8884d8" />
              </BarChart>
            ) : (
              <p>No performance data</p>
            )}
          </div>

          {/* DONUT */}
          <div style={{ padding: "20px" }}>
            <h2>📊 Overall Performance Analysis</h2>

            {subjectData.length > 0 ? (
              <>
                {/* PIE CHART */}
                <PieChart width={350} height={300}>
                  <Pie
                    data={subjectData}
                    dataKey="avgMarks"
                    nameKey="subject"
                    outerRadius={100}
                  >
                    {subjectData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>

                {/* AI SUMMARY */}
                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                  }}
                >
                  <h3>🤖 AI Insight</h3>
                  <p>
                    Your weakest subject is <b>{getWeakSubject()}</b>. <br />
                    Focus more on this area to improve your overall performance.
                  </p>
                </div>
              </>
            ) : (
              <p>No test data available for analysis</p>
            )}
          </div>
        </div>

        {/* TABLE + SIDE */}
        <div className="bottom">
          {/* TABLE */}
          <div className="table-box">
            <h3>Tests Performed</h3>

            <table className="table-dashboard">
              <thead>
                <tr>
                  <th className="th-dashboard">Test</th>
                  <th className="th-dashboard">Company</th>
                  <th className="th-dashboard">Marks Obtained</th>
                  <th className="th-dashboard">Date</th>
                  <th className="th-dashboard">Time</th>
                </tr>
              </thead>

              <tbody>
                {testData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="td-dashboard">
                        <Link style={{textDecoration:'none', color:'black'}} to={`/test-analysis/${item._id}`} state={{test:item}}>{item.test_name}</Link>
                      </td>
                      <td className="td-dashboard">{item.company}</td>
                      <td className="td-dashboard">{item.marks}</td>
                      <td className="td-dashboard">
                        {new Date(item.date).toISOString().split("T")[0]}
                      </td>
                      <td className="td-dashboard">{item.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

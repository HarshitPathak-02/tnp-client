// import React, { useContext, useState, useEffect } from "react";
// import "./StudentDashboard.css";
// import { UserContext } from "../../context/UserContext";

// import axios from "axios";

// const StudentDashboard = () => {
//   const { user } = useContext(UserContext);
//   const [testData, setTestData] = useState([]);

//   const getTestHistory = async () => {
//     await axios
//       .get(`http://localhost:8000/test-history/?username=${user.username}`)
//       .then((response) => {
//         console.log(response.data.data);
//         setTestData(response.data.data);
//       });
//   };

//   useEffect(() => {
//     getTestHistory();
//   }, []);

//   return (
//     <div className="student-dashboard-main">
//       <div className="student-dashboard-main-up">
//         <div className="student-dashboard-main-up-left">
//           <img src="card1.jpg" alt="profile_pic" className="profile-pic" />
//           <div className="student-dashboard-main-up-right">
//             <h2>{user.fullname}</h2>
//             {/* <h2>bdisbds</h2> */}
//             <div className="student-dashboard-main-up-down-right">
//               <p>
//                 <strong>Enrollment No</strong> <br />
//                 {user.enrollment}
//                 {/* dbakjdsac */}
//               </p>
//               <p>
//                 <strong>Branch</strong>
//                 <br />
//                 {user.branch}
//                 {/* vhgcjhb */}
//               </p>
//               <p>
//                 <strong>College</strong> <br />
//                 {user.college}
//                 {/* nvcfugtvh */}
//               </p>
//               <p>
//                 <strong>Email</strong>
//                 <br />
//                 {user.email}
//                 {/* gfdryf */}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="student-dashboard-main-mid">
//         <div className="student-dashboard-main-mid-card">
//           <div className="student-dashboard-main-mid-card-left">
//             <h2>Total Test</h2>
//             <p>
//               {testData.length}
//             </p>
//           </div>
//           <div className="student-dashboard-main-mid-card-right">
//             <h4>
//               <i class="fa-solid fa-book-open-reader"></i>
//             </h4>
//           </div>
//         </div>
//       </div>
//       <div className="student-dashboard-main-down">
//         <div className="student-dashboard-main-down-up">
//           <h2>Test History</h2>
//         </div>
//         <div className="student-dashboard-main-down-lower">
//           <table>
//             <tr>
//               <th>Test</th>
//               <th>Campany</th>
//               <th>Marks Obtained</th>
//               <th>Date</th>
//               <th>Time</th>
//             </tr>
//             {testData.map((item) => {
//               return (
//                 <tr>
//                   <td>{item.test_name}</td>
//                   <td>{item.company}</td>
//                   <td>{item.marks}</td>
//                   <td>{item.date.toString().split("T")[0]}</td>
//                   <td>{item.time}</td>
//                 </tr>
//               );
//             })}
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useContext, useState, useEffect } from "react";
import "./StudentDashboard.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

// ✅ charts
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
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

  return (
    <div className="student-dashboard-main">
      {/* 🔹 PROFILE SECTION */}
      <div className="student-dashboard-main-up">
        <div className="student-dashboard-main-up-left">
          <img src="card1.jpg" alt="profile_pic" className="profile-pic" />
          <div className="student-dashboard-main-up-right">
            <h2>{user.fullname}</h2>

            <div className="student-dashboard-main-up-down-right">
              <p>
                <strong>Enrollment No</strong> <br />
                {user.enrollment}
              </p>
              <p>
                <strong>Branch</strong>
                <br />
                {user.branch}
              </p>
              <p>
                <strong>College</strong> <br />
                {user.college}
              </p>
              <p>
                <strong>Email</strong>
                <br />
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 STATS CARD */}
      <div className="student-dashboard-main-mid">
        <div className="student-dashboard-main-mid-card">
          <div className="student-dashboard-main-mid-card-left">
            <h2>Total Test</h2>
            <p>{testData.length}</p>
          </div>
          <div className="student-dashboard-main-mid-card-right">
            <h4>
              <i className="fa-solid fa-book-open-reader"></i>
            </h4>
          </div>
        </div>
      </div>

      {/* 🔥 NEW: OVERALL ANALYSIS SECTION */}
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

      {/* 🔹 TEST HISTORY TABLE */}
      <div className="student-dashboard-main-down">
        <div className="student-dashboard-main-down-up">
          <h2>Test History</h2>
        </div>
        <div className="student-dashboard-main-down-lower">
          <table>
            <thead>
              <tr>
                <th>Test</th>
                <th>Company</th>
                <th>Marks Obtained</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {testData.map((item, index) => {
                return (
                  <Link to={`/test/${item._id}`} key={index} style={{ textDecoration: "none" }}>
                    <tr>
                      <td>{item.test_name}</td>
                      <td>{item.company}</td>
                      <td>{item.marks}</td>
                      <td>{item.date.toString().split("T")[0]}</td>
                      <td>{item.time}</td>
                    </tr>
                  </Link>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

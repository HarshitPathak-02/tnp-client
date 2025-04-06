import React, { useContext, useState, useEffect } from "react";
import "./StudentDashboard.css";
import { UserContext } from "../../context/UserContext";

import axios from "axios";

const StudentDashboard = () => {
  const { user } = useContext(UserContext);
  const [testData, setTestData] = useState([]);

  const getTestHistory = async () => {
    await axios
      .get(`http://localhost:8000/test-history/?username=${user.username}`)
      .then((response) => {
        console.log(response.data.data);
        setTestData(response.data.data);
      });
  };

  useEffect(() => {
    getTestHistory();
  }, []);

  return (
    <div className="student-dashboard-main">
      <div className="student-dashboard-main-up">
        <div className="student-dashboard-main-up-left">
          <img src="card1.jpg" alt="Albart Flores" className="profile-pic" />
          <div className="student-dashboard-main-up-right">
            {/* <h2>{user.fullname}</h2> */}
            <h2>bdisbds</h2>
            <div className="student-dashboard-main-up-down-right">
              <p>
                <strong>Enrollment No</strong> <br />
                {/* {user.enrollment} */}
                dbakjdsac
              </p>
              <p>
                <strong>Branch</strong>
                <br />
                {/* {user.branch} */}
                vhgcjhb
              </p>
              <p>
                <strong>College</strong> <br />
                {/* {user.college} */}
                nvcfugtvh
              </p>
              <p>
                <strong>Email</strong>
                <br />
                {/* {user.email} */}
                gfdryf
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="student-dashboard-main-mid">
        <div className="student-dashboard-main-mid-card">
          <div className="student-dashboard-main-mid-card-left">
            <h2>Total Test</h2>
            <p>
              {" "}
              <strong>100</strong>
            </p>
          </div>
          <div className="student-dashboard-main-mid-card-right">
            <h4>
              <i class="fa-solid fa-book-open-reader"></i>
            </h4>
          </div>
        </div>
      </div>
      <div className="student-dashboard-main-down">
        <div className="student-dashboard-main-down-up">
          <h2>Test History</h2>
        </div>
        <div className="student-dashboard-main-down-lower">
          <table>
            <tr>
              <th>Test</th>
              <th>Campany</th>
              <th>Marks Obtained</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
            {testData.map((item) => {
              return (
                <tr>
                  <td>{item.test_name}</td>
                  <td>{item.company}</td>
                  <td>{item.marks}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
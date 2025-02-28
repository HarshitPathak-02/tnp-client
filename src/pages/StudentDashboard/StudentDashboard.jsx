import React from 'react'
import "./StudentDashboard.css"
import demoUser from "../../assets/images/demo-logo.webp"

const StudentDashboard = () => {
  return (
    <div className='student-dashboard-main'>
        <div className="student-dashboard-main-up">
            <div className="student-dashboard-main-up-left">
                <img src={demoUser} alt="" />
            </div>
            <div className="student-dashboard-main-up-right">
                <h3>student name</h3>
                <p> enrollment-number <br /> xxx-xxx-xxx</p>
                <p> branch <br /> cse</p>
                <p> college <br /> xyz</p>
                <p>email <br /> titu@gmail.com</p>
            </div>
        </div>
        <div className="student-dashboard-main-mid">
            <div className="student-dashboard-main-mid-card"></div>
        </div>
        <div className="student-dashboard-main-down">
           
        </div>
    </div>


  )
}

export default StudentDashboard
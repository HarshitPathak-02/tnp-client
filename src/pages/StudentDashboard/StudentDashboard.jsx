import React from 'react'
import "./StudentDashboard.css"

const StudentDashboard = () => {
    return (
        <div className="student-dashboard-main">
            <div className="student-dashboard-main-up">

                <div className="student-dashboard-main-up-left">
                    <img src="card1.jpg" alt="Albart Flores" className="profile-pic" />

                    <div className="student-dashboard-main-up-right">
                        <h2>Student Name</h2>
                        <div className="student-dashboard-main-up-down-right">
                            <p><strong>Student ID:</strong> <br />00-xxxx-y</p>
                            <p><strong>Branch</strong><br />xxxxxx</p>
                            <p><strong>College</strong> <br />xxxxx</p>
                            <p><strong>Date of Admission</strong> <br /> xx-xx-xxx</p>
                            <p><strong>Email:</strong><br /> titu@titu.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="student-dashboard-main-mid">
                <div className="student-dashboard-main-mid-card">
                    <div className="student-dashboard-main-mid-card-left">
                        <h2>Total Test</h2>
                        <p> <strong>100</strong></p>
                    </div>
                    <div className="student-dashboard-main-mid-card-right">
                        <h4>chchuchuchu</h4>
                    </div>
                </div>
            </div>
            <div className="student-dashboard-main-down"></div>

        </div>
    )
}

export default StudentDashboard

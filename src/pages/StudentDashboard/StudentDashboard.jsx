import React, { useContext } from 'react'
import "./StudentDashboard.css"
import { UserContext } from '../../context/UserContext'

const StudentDashboard = () => {

    const {user} = useContext(UserContext)

    return (
        <div className="student-dashboard-main">
            <div className="student-dashboard-main-up">

                <div className="student-dashboard-main-up-left">
                    <img src="card1.jpg" alt="Albart Flores" className="profile-pic" />
                    <div className="student-dashboard-main-up-right">
                        <h2>{user.fullname}</h2>
                        <div className="student-dashboard-main-up-down-right">
                            <p><strong>Enrollment No</strong> <br/>{user.enrollment}</p>
                            <p><strong>Branch</strong><br />{user.branch}</p>
                            <p><strong>College</strong> <br />{user.college}</p>
                            <p><strong>Email</strong><br />{user.email}</p>
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
            <div className="student-dashboard-main-down">
                <div className="student-dashboard-main-down-up">
                    <h2>Test History</h2>
                </div>
            </div>

        </div>
    )
}

export default StudentDashboard

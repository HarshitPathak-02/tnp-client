import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignupForm from './components/Forms/SignupForm'
import SigninForm from './components/Forms/SigninForm'
import "./App.css"
import Tests from './pages/Tests/Tests'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import TestScreen from './pages/TestScreen/TestScreen'
import StudentDashboard from './pages/StudentDashboard/StudentDashboard'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SignupForm/>}></Route>
          <Route path='/signin' element={<SigninForm/>}></Route>
          <Route path='/tests' element={<Tests/>}></Route>
          <Route path='/tests/tcs-online-assessment' element={<TestScreen/>}></Route>
          <Route path='/student-dashboard' element={<StudentDashboard/>}></Route>

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App

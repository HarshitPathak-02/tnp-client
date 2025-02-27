import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignupForm from './components/Forms/SignupForm'
import SigninForm from './components/Forms/SigninForm'
import "./App.css"
import Tests from './pages/Tests/Tests'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SignupForm/>}></Route>
          <Route path='/signin' element={<SigninForm/>}></Route>
          <Route path='/tests' element={<Tests/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

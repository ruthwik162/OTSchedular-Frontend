import React from 'react'
import { Toaster } from 'react-hot-toast'
import Login from './Components/Auth/Login'
import { Route, Routes } from 'react-router-dom'
import { useAppContext } from './AppContext/AppContext'
import Navbar from './Components/common/Navbar'
import Home from './Components/common/Home'
import Footer from './Components/common/Footer'
import Profile from './Components/common/Profile'

const App = () => {

  const { showUserLogin } = useAppContext();

  return (
    <div>
      {showUserLogin ? <Login /> : null}
      <Navbar />
      <Toaster />

      {/* Main Routes */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App

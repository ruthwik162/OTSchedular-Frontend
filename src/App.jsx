import React from 'react'
import { Toaster } from 'react-hot-toast'
import Login from './Components/Auth/Login'
import { Route, Routes } from 'react-router-dom'
import { useAppContext } from './AppContext/AppContext'
import Navbar from './Components/common/Navbar'
import Footer from './Components/common/Footer'
import Profile from './Components/common/Profile'
import Home from './Pages/Home'
import Department from './Pages/Department'
import About from './Components/common/About'

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
        <Route path='/department' element={<Department/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App

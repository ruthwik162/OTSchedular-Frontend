import React, { useEffect, useState } from 'react'
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
import PatientDashboard from './Pages/PatientDashboard'
import DoctorDashboard from './Pages/DoctorDashboard' // import doctor dashboard
import Doctors from './Components/common/Doctors'

const App = () => {
  const { showUserLogin } = useAppContext()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div>
      {showUserLogin ? <Login /> : null}
      <Navbar />
      <Toaster />

      {/* Main Routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/department' element={<Department />} />
        <Route path='/about' element={<About />} />
        <Route path='/doctors' element={<Doctors />} />

        {/* Conditionally render dashboard based on role */}
        <Route
          path='/my-appointment'
          element={
            user?.role === 'patient' ? (
              <PatientDashboard />
            ) : (
              <DoctorDashboard />
            )
          }
        />
      </Routes>

      <Footer />
    </div>
  )
}

export default App

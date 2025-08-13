import React from 'react'
import Mainbanner from '../Components/common/Mainbanner'
import DoctorCard from '../Components/common/DoctorCard'
import Treatments from '../Components/common/Treatment'
import Testimonials from '../Components/common/Testimonial'

const Home = () => {
  return (
    <div>
      <Mainbanner/>
      <DoctorCard/>
      <Testimonials/>
    </div>
  )
}

export default Home

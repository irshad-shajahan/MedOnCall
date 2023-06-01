import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import ConsultDoctor from '../pages/Patient/ConsultDoctor'
import DoctorList from '../pages/Patient/DoctorList'
import DoctorDetails from '../pages/Patient/DoctorDetails'
import PaymentScreen from '../pages/Patient/PaymentScreen'
import Appointments from '../pages/Patient/Appointments'
import SessionScreen from '../pages/Doctor/SessionScreen'
import VideoCall from '../pages/Doctor/VideoCall'
import AppointmentHistory from '../pages/Patient/AppointmentHistoryAndFeedback'
import Success from '../pages/Patient/Success'

function UserRouter({socket}) {
  const User = useSelector((state) => state.user.user)
  useEffect(() => {
    socket.current?.emit('adduser', User?._id)
    socket.current?.on('getuser', () => {
    })
}, [User?._id])
  return (
    <Routes>
      <Route path="/consultDoctor" element={<ConsultDoctor />} />
      <Route path="/findDoctors/*" element={<DoctorList />} />
      <Route path="/doctorDetails/*" element={<DoctorDetails />} />
      <Route path="/paymentScreen" element={<PaymentScreen />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/startSession" element={<SessionScreen  socket={socket}/>} />
      <Route path="/feedback" element={<AppointmentHistory socket={socket} />} />
      <Route path="/videoCall" element={<VideoCall socket={socket}/>} />
      <Route path="/success/*" element={<Success />} />
    </Routes>
  )
}

export default UserRouter
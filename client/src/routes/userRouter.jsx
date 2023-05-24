import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ConsultDoctor from '../pages/Patient/ConsultDoctor'
import DoctorList from '../pages/Patient/DoctorList'
import DoctorDetails from '../pages/Patient/DoctorDetails'
import PaymentScreen from '../pages/Patient/PaymentScreen'
import Appointments from '../pages/Patient/Appointments'
import SessionScreen from '../pages/Doctor/SessionScreen'

function UserRouter() {
  return (
    <Routes>
      <Route path="/consultDoctor" element={<ConsultDoctor />} />
      <Route path="/findDoctors/*" element={<DoctorList />} />
      <Route path="/doctorDetails/*" element={<DoctorDetails />} />
      <Route path="/paymentScreen" element={<PaymentScreen />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/startSession" element={<SessionScreen />} />
    </Routes>
  )
}

export default UserRouter
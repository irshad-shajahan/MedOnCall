import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ConsultDoctor from '../pages/Patient/ConsultDoctor'
import DoctorList from '../pages/Patient/DoctorList'

function UserRouter() {
  return (
    <Routes>
      <Route path="/consultDoctor" element={<ConsultDoctor/>} />
      <Route path="/findDoctors/*" element={<DoctorList/>} />

    </Routes>
  )
}

export default UserRouter
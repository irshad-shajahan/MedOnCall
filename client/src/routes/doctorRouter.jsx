import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DocHome from '../pages/Doctor/DocHome';
import DocProfile from '../pages/Doctor/DocProfile';
import Availability from '../pages/Doctor/Availability';
import Appointments from '../pages/Doctor/Appointments';
import SessionScreen from '../pages/Doctor/SessionScreen';

function DoctorRouter() {
  const navigate = useNavigate();
  const doc = JSON.parse(localStorage.getItem('check'))
  useEffect(() => {
    if (!doc?.isProfileComplete) {
      navigate('/doctorForm');
    } else if (!doc?.isVerified) {
      navigate('/pendingVerification');
    }
  }, [doc]);

  return (
    <Routes>
      <Route path="/" element={<DocHome />} />
      <Route path="/profile" element={<DocProfile />} />
      <Route path="/availability" element={<Availability />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/startSession" element={<SessionScreen />} />
    </Routes>
  );
}

export default DoctorRouter;

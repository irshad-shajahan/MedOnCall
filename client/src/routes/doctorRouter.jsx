import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DocProfile from '../pages/Doctor/DocProfile';
import Availability from '../pages/Doctor/Availability';
import Appointments from '../pages/Doctor/Appointments';
import SessionScreen from '../pages/Doctor/SessionScreen';
import AppointmentsHistory from '../pages/Doctor/appointmentHistory';
import PreparePrescription from '../pages/Doctor/preparePrescription';
import VideoCall from '../pages/Doctor/VideoCall';

function DoctorRouter({socket}) {
  const User = useSelector((state) => state.user.user)
  useEffect(() => {
    socket.current?.emit('adduser', User?._id)
    socket.current?.on('getuser', () => {
    })
}, [User?._id])

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
      <Route path="/" element={<DocProfile />} />
      <Route path="/availability" element={<Availability />} />
      <Route path="/appointments" element={<Appointments socket={socket}/>} />
      <Route path="/appointmentHistory" element={<AppointmentsHistory />} />
      <Route path="/startSession/*" element={<SessionScreen socket={socket}/>} />
      <Route path="/preparePrescription" element={<PreparePrescription  socket={socket}/>} />
      <Route path="/videoCall" element={<VideoCall socket={socket}/>} />
    </Routes>
  );
}

export default DoctorRouter;

import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DocHome from '../pages/Doctor/DocHome';

function DoctorRouter() {
  const navigate = useNavigate();
  const doc = useSelector((state) => state.user.user);
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
    </Routes>
  );
}

export default DoctorRouter;

import React, {  } from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './components/RouteProtection/protectedRoute';
import PublicRoute from './components/RouteProtection/publicRoute';
import OtpInput from './pages/otpSubmit';
import DoctorForm from './pages/DoctorForm';


function App() {
//   const Doctor = useSelector(state=>state.user.user)
//   const navigate = useNavigate();
  
// useEffect(()=>{
//   if(Doctor?.isDoctor){
//     if(Doctor.additionalDetails){
//       if(Doctor.verified){
//         alert('the doctor is verified')
//       }
//     }else{
//       alert('hello')
//       navigate('/doctorForm');
//     }
//   }
// },[Doctor,navigate])
  return (
    <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/otpSubmit"
              element={
                <PublicRoute>
                  <OtpInput />
                </PublicRoute>
              }
            />
            <Route
              path="/doctorForm"
              element={
                <ProtectedRoute>
                  <DoctorForm />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

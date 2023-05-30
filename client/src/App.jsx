import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import HomePage from './pages/Patient/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './components/RouteProtection/protectedRoute';
import PublicRoute from './components/RouteProtection/publicRoute';
import OtpInput from './pages/otpSubmit';
import DoctorForm from './pages/Doctor/DoctorForm';
import Spinner from './components/features/spinner';
import DocterPendingVerification from './pages/Doctor/DocterPendingVerification';
import DoctorRouter from './routes/doctorRouter';
import UserRouter from './routes/userRouter';

function App() {
  const isLoading = useSelector((state) => state.alerts.loading);
  const socket = useRef()
  const Doctor = useSelector((state) => state.user.user);
  const isDoctor = Doctor?.isDoctor;
  useEffect(() => {
    socket.current = io('http://localhost:8080', { path: '/server/socket.io/' });
    return () => {
      socket.current.disconnect();
    };
  }, []);
  
  return (
    <BrowserRouter>
      {isLoading && <Spinner />}
      <Routes>
        <Route
          path="/"
          element={
            isDoctor ? (
              <ProtectedRoute>
                <DoctorRouter socket={socket} />
              </ProtectedRoute>
            ) : (
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            )
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
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute>
              <DoctorRouter socket={socket}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pendingVerification"
          element={
            <ProtectedRoute>
              <DocterPendingVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <UserRouter socket={socket} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;

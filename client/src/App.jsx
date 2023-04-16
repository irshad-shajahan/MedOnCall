/* eslint-disable no-nested-ternary */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
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
import DocHome from './pages/Doctor/DocHome';

function App() {
  const isLoading = useSelector((state) => state.alerts.loading);
  const user = useSelector((state) => state.user.user);

  const isDoctor = user?.isDoctor;
  const isProfileComplete = user?.isProfileComplete;
  const isVerified = user?.isVerified;
  return (
    <BrowserRouter>
      {isLoading && <Spinner />}

      <Routes>
        <Route
          path="/"
          element={
            isDoctor ? (
              isProfileComplete ? (
                isVerified ? (
                  <ProtectedRoute>
                    <DocHome />
                  </ProtectedRoute>
                ) : (
                  <Navigate to="/pendingVerification" />
                )
              ) : (
                <Navigate to="/doctorForm" />
              )
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
          path="/pendingVerification"
          element={
            <ProtectedRoute>
              <DocterPendingVerification />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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

import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/RouteProtection/protectedRoute';
import PublicRoute from './components/RouteProtection/publicRoute';
import UserPanel from './pages/UserPanel';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userpanel"
          element={
            <ProtectedRoute>
              <UserPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

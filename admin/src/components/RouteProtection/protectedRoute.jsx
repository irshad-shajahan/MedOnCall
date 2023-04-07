import React from 'react';
import { Navigate } from 'react-router-dom';

export default function protectedRoute({ children }) {
    if (localStorage.getItem('token')) {
      return children;
    }
    return <Navigate to="/login" />;
}

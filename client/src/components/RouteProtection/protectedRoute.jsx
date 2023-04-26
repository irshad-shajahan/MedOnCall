import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetUserDetailsQuery } from '../../redux/features/api/apiSlice';
import { setUser } from '../../redux/features/userSlice';

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { data, isSuccess } = useGetUserDetailsQuery();
  if (isSuccess) {
    dispatch(setUser(data.data));
  }
  if (token) {
    try {
      if (data) {
        if (!data.success) {
          localStorage.clear();
         return <Navigate to="/login" />;
        }
      }
    } catch (err) {
      console.log('error in protected route', err);
    }
  }
  if (localStorage.getItem('token')) {
    return children;
  }
  return <Navigate to="/login" />;
}

/* eslint-disable import/prefer-default-export */
import axios from './axios';

export function postForm(route, data) {
  return axios.post(route, data, {
    headers: { 'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`, },
    withCredentials: true,
  });
}

export function getdata(route) {
  return axios.get(route, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    withCredentials: true,
  });
}

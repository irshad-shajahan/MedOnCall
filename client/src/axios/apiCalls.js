/* eslint-disable import/prefer-default-export */
import axios from './axios';


export function postForm(route,data){
       return axios.post(route,data,{
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${localStorage.getItem('token')}`},
        withCredentials: true,
      })
}

export function getrequest(route){
  return axios.get(route,{
    responseType: 'blob',
   headers: { "Content-Type": "application/json" ,
   Authorization: `Bearer ${localStorage.getItem('token')}`},
   withCredentials: true,
 })
}


export function docPost(route,data){
     return axios.post(`/doctor${route}`,data,{
      headers: { "Content-Type": "application/json" ,
      Authorization: `Bearer ${localStorage.getItem('token')}`},
      withCredentials: true,
    })
}
export function docGet(route){
  return axios.get(`/doctor${route}`,{
   headers: { "Content-Type": "application/json" ,
   Authorization: `Bearer ${localStorage.getItem('token')}`},
   withCredentials: true,
 })
}

export function imageForm(route,data){
  return axios.post(`/doctor${route}`,data,{
   headers: {"Content-Type": "multipart/form-data",
   Authorization: `Bearer ${localStorage.getItem('token')}`},
  // headers: { "Content-Type": "application/json" },
   withCredentials: true,
 })
}
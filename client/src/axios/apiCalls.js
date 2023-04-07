/* eslint-disable import/prefer-default-export */
import axios from './axios';

export function postForm(route,data){
       return axios.post(route,data,{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
} 


export function docPost(route,data){
     return axios.post(`/doctor${route}`,data,{
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
} 
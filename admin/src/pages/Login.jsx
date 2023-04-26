/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from '../axios/axios';

const Login = () => {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const [formData, setFormData] = useState({});
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(event) {
    event.preventDefault();
  try{
    if(!formData.adminid){
      toast("Please fill in the credentials")
      return
    }
    const res = await axios.post('/login',formData,{
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    if(res.data.success){
      toast.success("login succesfull")
      localStorage.setItem("token",res.data.token)
      navigate('/')
    }else{
      toast.error(res.data.message)
    }
  }catch(error){
    // eslint-disable-next-line no-console
    console.log(error);
  }
  }
  return (
    <div>
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center text-2xl font-semibold text-gray-00 dark:text-white"
        >
          <img
            className="w-auto h-24 mr-2"
            src="./src/assets/logo.png"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Admin Login
            </h1>
            <form className="space-y-4 md:space-y-" onSubmit={handleSubmit}>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="phone">Admin ID</label>
              <div>
                <input
                  type=""
                  name="adminid"
                  placeholder="*****"
                  className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div> 
  );
};

export default Login;

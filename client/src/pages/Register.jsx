/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onSignInSubmit } from '../firebaseConfigFile';
import {
  validatePhone,
  isValidName,
  validatePassword,
} from '../components/validations';
import { docPost, postForm} from '../axios/apiCalls';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ code: '+91' });
  const [doctorCheck, SetDoctorCheck] = useState(false)
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  function adminToggle(){
    if(doctorCheck){
      SetDoctorCheck(false)
    }else{
      SetDoctorCheck(true)
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!formData.phone || !formData.name || !formData.password) {
        toast.error('Please fill in the credentials');
      } else {
        if (!isValidName(formData.name)) {
          toast.warn('Enter a valid name');
        }
        if (!validatePhone(formData.phone)) {
          toast.warn('Enter valid phone number');
        }
        if (validatePassword(formData.password)) {
          toast.warn(validatePassword(formData.password));
        }
        if (
          isValidName(formData.name) &&
          validatePhone(formData.phone) &&
          !validatePassword(formData.password)
          ) {
            formData.isDoctor = doctorCheck
            const {phone} = formData

            const existDoc = await docPost('/existDoc',{phone})
            const existUser = await postForm('/existUser',{phone})
            if(doctorCheck){
              if(existDoc.data.success){
                if(!existUser.data.success){
                  toast.error('The entered number is already registered as a user')
                }
              }else{
                toast(existDoc.data.message)
              }
            }else if(existUser.data.success){
                  if(!existDoc.data.success){
                    toast.error('The entered number is already registered as a doctor')
                  }
                }else{
                  toast.success(existUser.data.message)
                }
              if(existDoc.data.success && existUser.data.success){
                onSignInSubmit(formData.code, formData.phone).then(() => {
                  Swal.fire('OTP Sent!', 'Please check your phone', 'success').then(
                    () => {
                      navigate('/otpSubmit', { state: formData });
                    }
                  );
                });
              }
        }
      }
    } catch (error) {
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
              <div className='flex'>

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Join Us
              </h1>
                <span className="ml-36 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Are you a Doctor?
                </span>
              <label className="relative items-center cursor-pointer ">
                <input type="checkbox" onChange={adminToggle} value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
              </div>
              <form className="space-y-4 md:space-y-" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="eg: Joe Doe"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <div className="flex">
                  <select
                    id="countries"
                    name="code"
                    className="flex-shrink-0 z-10 inline-flex items-center text-sm font-medium text-gray-500 bg-gray-100 border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    onChange={handleChange}
                  >
                    <option defaultValue="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+92">+92</option>
                    <option value="+86">+86</option>
                    <option value="+81">+81</option>
                  </select>
                  <input
                    type=""
                    name="phone"
                    id="number"
                    placeholder="eg: 1234567890"
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white rounded-r-lg"
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
                <div className="flex items-start">
                  <div id="recaptcha-container"> </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;

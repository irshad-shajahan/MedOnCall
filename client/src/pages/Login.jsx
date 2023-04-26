/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../firebaseConfigFile';
import { validatePhone } from '../components/validations';
import { useUserGoogleLoginMutation, useUserLoginMutation } from '../redux/features/api/apiSlice';
import { hideLoading, showloading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

const Login = () => {
  const dispatch = useDispatch()
  const [verifyLogin, { isLoading }] = useUserLoginMutation();
  const [verifyGoogleLogin] = useUserGoogleLoginMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!formData.phone || !formData.password) {
        toast('Please fill in the credentials');
      } else {
        if (!validatePhone(formData.phone)) {
          toast('enter valid phone');
        }
        if (validatePhone(formData.phone) && !isLoading) {
          dispatch(showloading())
          verifyLogin(formData).then((res) => {
            if (res.data.success) {
              localStorage.setItem('token', res.data.token);
              dispatch(setUser(res.data.response))
              dispatch(hideLoading())
              if(res.data.response.isDoctor){
               navigate('/doctor')
              }else{
                navigate('/')
              }
            } else {
              toast.error(res.data.message);
              dispatch(hideLoading())
            }
          })
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
  const googleSignin = () => {
    signInWithPopup(auth, provider).then((data) => {
      const userData = {
        name: data.user.displayName,
        email: data.user.email,
        profilePhoto: data.user.photoURL,
      };
      if (data.user.emailVerified) {
        // postForm('/googleRegister', userData).then((res) => {
          verifyGoogleLogin(userData).then((res)=>{
          if (res.data.success) {
            toast('login succesfull');
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('doctor',true);
            navigate('/');
          } else {
            toast(res.data.message);
          }
        });
      }
    });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
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
                Login to Your Account
              </h1>
              <form className="space-y-4 md:space-y-" onSubmit={handleSubmit}>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <div>
                  <input
                    type=""
                    name="phone"
                    id="number"
                    placeholder="eg: 1234567890"
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
                <div className="flex items-start" />
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <a
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Regsister here
                  </a>
                </p>
                <div className="text-center flex-col flex text-white">
                  <span className="font-bold">Login with Google</span>
                  <button
                    type="button"
                    className="text-2xl bg-red-600 mt-1 rounded-lg"
                    onClick={googleSignin}
                  >
                    <ion-icon name="logo-google" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

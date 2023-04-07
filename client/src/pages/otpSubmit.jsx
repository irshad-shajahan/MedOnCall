/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verify } from '../firebaseConfigFile';
import { postForm } from '../axios/apiCalls';

function OtpInput() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [hasError, setError] = useState(false);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [otp, setOtp] = useState('');
  function handleInputChange(event, index) {
    const input = event.target;

    if (event.key === 'Backspace' && index > 0 && !input.value) {
      inputRefs[index - 1].current.focus();
    }

    if (input.value.length > 0 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
    let newOtp = '';
    inputRefs.forEach((inputRef) => {
      newOtp += inputRef.current.value;
    });
    setOtp(newOtp);
  }
  function otpsubmit() {
    try {
      verify(otp)
        .then(() => {
          toast('OTP verified');
          postForm('/register',data).then(() => {
            navigate('/login');
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err)
        });
    } catch (err) {
      setError(true);
    }
  }
  if (hasError) {
    return <p>sorry signup failed</p>;
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a
            href="/"
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
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Enter Your OTP
              </h1>
              <form className="space-y-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your One Time Pssword has been send to your phone. Please
                  enter the number below
                </label>
                <div className="flex mt-8">
                  {inputRefs.map((inputRef, index) => (
                    <input
                      className=" w-full py-2 text-center text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg mr-1"
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      ref={inputRef}
                      type="text"
                      maxLength={1}
                      onKeyUp={(event) => handleInputChange(event, index)}
                    />
                  ))}
                </div>

                <div className="flex justify-center pt-3">
                  <button
                    type="button"
                    className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={otpsubmit}
                  >
                    validate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OtpInput;

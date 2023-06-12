import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import {  useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import { useGetUserDetailsQuery } from '../../redux/features/api/apiSlice';
import imageUrl from '../../assets/verifypending.png'

function DocterPendingVerification() {
  const navigate = useNavigate();
  const { data } = useGetUserDetailsQuery();
  const check =  JSON.parse(localStorage.getItem('check'))
  if(check.isVerified){
    navigate('/doctor')
  }
  const user = data?.data;
  if (user?.isVerified) {
    navigate('/doctor');
  }
  return (
    <Navbar>
      <div className="justify-center items-center flex md:h-[89vh] h-[92vh] bg-gray-100">
        <div className="max-w-lg rounded overflow-hidden ">
          {/* <div className='w'> */}
          <img
            src={imageUrl}
            className="mx-auto w-48"
            alt="Sunset in the mountains"
          />
          {/* </div> */}
          <div className="px-6 py-4">
            <div className="mb-2">
              <h1 className="font-semibold text-blue-800 text-2xl mb-2 text-center">
                Your account is being verified
              </h1>
              <TypeAnimation
                className="text-left ml-5 text-md font-semibold"
                sequence={[
                  'Verification in progress. Thank you for your patience.',
                  "Almost there! We're verifying your account now.",
                  "We're processing your account. Please stand by.",
                ]}
                speed={90}
                deletionSpeed={80}
                repeat={Infinity}
              />
            </div>
            <p className="text-gray-400 text-sm text-center">
              {`Your account's is currently undergoing verification by our team. The
              purpose of this verification process is likely to confirm
              your identity, qualifications, or other relevant information
              to ensure that they meet the necessary standards or requirements
              for the professional role. Once the verification is complete,
              you should be able to access the relevant systems or
              services associated with your account.`}
            </p>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default DocterPendingVerification;

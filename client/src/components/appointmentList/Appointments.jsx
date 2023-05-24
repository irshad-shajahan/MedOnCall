/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentsList = ({ appointments }) => {
  console.log(appointments);
    const navigate = useNavigate()
  return (
    <div className="bg-gray-100 p-4 rounded-lg w-full overflow-y-auto max-h-screen">
      <h2 className="text-lg font-semibold mb-4">Appointments</h2>
      {appointments?.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white w-full rounded-lg shadow p-4 mb-4 flex justify-between items-center"
         >
          <div className='w-[7%]'>
          <img className='rounded-xl' src={appointment.profileImage} alt="" />
          </div>
          <div className='w-[40%]'>
          <h3 className="text-xl font-semibold mb-2">
             Dr.{appointment.doctorName}
          </h3>
          <p className="text-gray-600">Appointment ID: {appointment._id}</p>
          <p className="text-yellow-600 font-semibold">Session Duration: 1 Hour</p>
          </div>
          <div className='w-[30%]'>
          <h5 className="text-red-600 font-semibold text-xl ">Time: {appointment.time}</h5>
          <p className="text-gray-600">Date: {appointment.date}</p>
          </div>
          {/* <div>
            <button type='button' className='bg-red-500 rounded-md p-1 font-semibold text-white'>Cancel Appointment</button>
          </div> */}
          <div className='w-[15%]'>
            <button type='button' onClick={()=>navigate('/user/startSession')} className='bg-green-500 rounded-md p-1 font-semibold text-white'>Start Session</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;

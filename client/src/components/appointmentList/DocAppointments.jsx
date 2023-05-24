/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DocAppointmentsList = ({ appointments }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 p-4 rounded-lg w-full overflow-y-auto max-h-screen">
      <h2 className="text-lg font-semibold mb-4">Appointments</h2>
      {appointments?.map((appointment) => (
        <div>
          <h2 className="text-lg text-center bg-blue-900 text-white font-bold mb-4 rounded-lg">
            {appointment.date === formattedDate ? 'Today' : appointment.date}
          </h2>
          {appointment.slots.map((slots) => (
            <div
              key={slots.id}
              className="bg-white w-full rounded-lg shadow p-4 mb-4 flex justify-between items-center"
            >
              <div className="w-[7%]">
                <img
                  className="rounded-xl"
                  src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                  alt=""
                />
              </div>
              <div className="w-[40%]">
                <h3 className="text-xl font-semibold mb-2">
                  Patient Name: <b className='uppercase text-blue-800'>{slots.patientName}</b>
                </h3>
                <p className="text-gray-600">
                  Appointment ID: {slots.AppointmentId}
                </p>
                <p className="text-yellow-600 font-semibold">
                  Session Duration: 1 Hour
                </p>
              </div>
              <div className="w-[30%]">
                <h5 className="text-red-600 font-semibold text-xl ">
                  Time: {slots.time}
                </h5>
                <p className="text-gray-600">Date: {appointment.date}</p>
              </div>
              {/* <div>
             <button type='button' className='bg-red-500 rounded-md p-1 font-semibold text-white'>Cancel Appointment</button>
           </div> */}
              <div className="w-[15%]">
                <button
                  type="button"
                  onClick={() => navigate('/doctor/startSession')}
                  className="bg-green-500 rounded-md p-1 font-semibold text-white"
                >
                  Start Session
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DocAppointmentsList;

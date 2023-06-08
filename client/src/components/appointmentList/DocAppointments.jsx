/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { groupBy } from 'lodash';
import { useCreateSessionMutation } from '../../redux/features/api/apiSlice';

const DocAppointmentsList = ({ appointments,socket }) => {
  const [createSession, actions] = useCreateSessionMutation()
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const navigate = useNavigate();
  const groupedAppointments = groupBy(appointments, 'date');
  const sortedDates = Object.keys(groupedAppointments).sort();
  function clickHandler(userId, appointmentId) {
    let data = {
      receiverId: userId,
      appointmentId
    }
    if (!actions.isLoading) {
      createSession(data).then(() => {
        socket.current.emit('session-startt', { receiverid:userId })
        
        navigate('/doctor/startSession', { state: {appointmentId,receiverId: userId} })
      })
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg w-full overflow-y-auto max-h-screen">
      <h2 className="text-lg font-semibold mb-4">Appointments</h2>
      {sortedDates?.map(date => (
        <div>
          <h2 className="text-lg text-center bg-blue-900 text-white font-bold mb-4 rounded-lg">
            {date === formattedDate ? 'Today' : date}
          </h2>
          {groupedAppointments[date].map(appointment => (
          <div>
                    {appointment.active?(<div className='bg-green-500 rounded-t-md'><p className='font-semibold text-white text-center'>Active Session</p></div>):''}

            <div
          key={appointment._id}
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
              Patient Name: <b className='uppercase text-blue-800'>{appointment.patientName}</b>
            </h3>
            <p className="text-gray-600">
              Appointment ID: {appointment._id}
            </p>
            <p className="text-yellow-600 font-semibold">
              Session Duration: 1 Hour
            </p>
          </div>
          <div className="w-[30%]">
            <h5 className="text-red-600 font-semibold text-xl ">
              Time: {appointment.time}
            </h5>
            <p className="text-gray-600">Date: {appointment.date}</p>
          </div>
          {/* <div>
           <button type='button' className='bg-red-500 rounded-md p-1 font-semibold text-white'>Cancel Appointment</button>
         </div> */}
          <div className="w-[15%]">
            {appointment.active?<button
              type="button"
              onClick={() => clickHandler(appointment.userId, appointment._id)}
              className="bg-orange-500 rounded-md p-1 font-semibold text-white"
            >
              Join Session
            </button>:<button
              type="button"
              onClick={() => clickHandler(appointment.userId, appointment._id)}
              className="bg-green-500 rounded-md p-1 font-semibold text-white"
            >
              Start Session
            </button>}
          </div>
        </div></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DocAppointmentsList;

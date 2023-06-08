/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppointmentsList = ({ appointments,socket,refetch }) => {
  const sortedAppointments = appointments.slice().sort((a, b) => {
    // Move completed appointments to the bottom
    if (a.completed && !b.completed) {
      return 1;
    }
    if (!a.completed && b.completed) {
      return -1;
    }

    // Move active appointments to the top regardless of date and time
    if (a.active && !b.active) {
      return -1;
    }
    if (!a.active && b.active) {
      return 1;
    }

    // Sort by date and time for non-active appointments
    const aDateTime = new Date(`${a.date} ${a.time}`);
    const bDateTime = new Date(`${b.date} ${b.time}`);
    return aDateTime - bDateTime; // Sort in descending order (recent on top)
  });
  function clickHandler( appointmentId) {

        navigate('/user/startSession', { state: {appointmentId} })
  }
    const navigate = useNavigate()
    useEffect(()=>{
      const sessionStarted = () => {
          toast.info("Your Session Has Started, Join now !", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: true,
              draggable: false,
            });
            refetch()
        };   
        socket.current.on('session-started', sessionStarted);
        return () => {
          socket.current.off('session-started', sessionStarted);
        };
      },[])
  return (
    <div className="bg-gray-100 p-4 rounded-lg w-full overflow-y-auto max-h-screen">
      <h2 className="text-lg font-semibold mb-4">Appointments</h2>
      {sortedAppointments?.map((appointment) => (
        
       <div>
        {appointment.active?(<div className='bg-green-500 rounded-t-md'><p className='font-semibold text-white text-center'>Active Session</p></div>):''}
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
          
          {appointment.completed ? (
  <h3 className='font-semibold text-gray-500'>Session Completed</h3>
) : (
  appointment.active ? (
    <button
      type='button'
      onClick={() => clickHandler(appointment?._id)}
      className='bg-green-500 rounded-md p-1 font-semibold text-white'
    >
      Join Session
    </button>
  ) : (
    <h3 className='font-semibold text-red-400'>Waiting for Doctor</h3>
  )
)}

          </div>
        </div>
       </div>
      ))}
    </div>
  );
};

export default AppointmentsList;

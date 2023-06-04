import React from 'react'
import { FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar'
import WentWrong from '../../components/WentWrong';
import {  usePatientAppointmentsQuery } from '../../redux/features/api/apiSlice';

function Success() {
    const {data,isSuccess} =usePatientAppointmentsQuery()

    if(!isSuccess){
        return (
            <WentWrong/>
        )
    }
    const appointment = data?.updatedAppointments[0]
    return (
        <div>
            <Navbar>
                <div className='flex justify-center items-center'>
                    <div className='max-w-[800px] justify-center mt-[-66px] text-center  w-full h-screen mx-auto flex flex-col'>
                        <div className="flex flex-col items-center justify-center h-screen">
                            <div className="text-6xl text-green-500">
                                <FaCheckCircle />
                            </div>
                            <h1 className="text-4xl font-bold mt-4">Appointment Booked Successfully!</h1>
                            <div className="flex items-center text-xl mt-3 font-semibold text-gray-700">
                                <FaCalendarAlt className="mr-2 text-4xl text-blue-800" />
                                <span>{appointment?.date}</span>
                            </div>
                            <p className="text-xl font-semibold  text-gray-700 mt-3">Time: {appointment.time}</p>
                            <p className="text-xl font-semibold text-gray-700 mt-3">Doctor: {appointment.doctorName}</p>
                            <Link to="/user/appointments" className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                Go to Appointments
                            </Link>
                        </div>

                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default Success
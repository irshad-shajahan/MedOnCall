/* eslint-disable no-unused-vars */
import React from 'react'
import { FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar'
import WentWrong from '../../components/WentWrong';
import { useDummyrefetchAppointmentsMutation, usePatientAppointmentsQuery, useVerifyPaymentQuery,  } from '../../redux/features/api/apiSlice';

function Success() {
    const navigate = useNavigate()
    const [refetchdummy,refetchAction] = useDummyrefetchAppointmentsMutation()
    const { data, isSuccess, isLoading } = usePatientAppointmentsQuery()
    const verifyPayment = useVerifyPaymentQuery()
    if(verifyPayment.isSuccess && !verifyPayment.isLoading){
        if(!verifyPayment.data.success){
            toast.warning(verifyPayment?.data.message)
        }
    }
    if (!isSuccess && !isLoading) {
        return (
            <WentWrong />
        )
    }
    const appointment = data?.updatedAppointments[0]
    function goToAppointments(){
        navigate('/user/appointments')
        if(!refetchAction.isLoading){
            refetchdummy('hi')
        }
    }
    if (isSuccess) {
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
                                <button type='button' onClick={goToAppointments} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                    Go to Appointments
                                </button>
                            </div>

                        </div>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default Success
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import NavBar from '../components/navbar/NavBar'
import { getdata, postForm } from '../axios/apicall';

const PaymentPanel = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUserData();
    }, [setData]);

    const getUserData = async () => {
        try {
            const res = await getdata('/paymentPanel');
            if (res.data.success) {
                setData(res.data.doc);
            }
        } catch (error) {
            console.log(error);
        }
    };
    function paymentHandler(documentId,doctorId){
        postForm('/approvePayment',{documentId,doctorId}).then((res)=>{
            // eslint-disable-next-line no-lone-blocks
            if(res?.data.success);{
                setData(res.data.doc);
            }
        })
    }

    return (
        <div>
            <Header />
            <div className="w-full min-h-[90vh] grid grid-cols-12">
                <NavBar />
                <div className="grid grid-cols-1  w-full col-span-10">
                    <div className="md:col-span-4">
                        <div className="bg-white rounded-lg shadow-lg">
                            <div className="flex items-center justify-between px-4 py-3 bg-blue-500 text-white">
                                <h2 className="text-lg font-semibold">Payment Panel</h2>
                            </div>
                            <div className="p-4">
                                {data.map((doctor) => (
                                    <div>

                                    {doctor.PendingPayment===0?<div className="flex items-center border-b bg-green-100 py-2 mt-3">
                                        <div className='flex flex-col w-2/5 m-3'>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Name: {doctor.doctorName} ({doctor.doctorId})</h5></div>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Current Fee: ₹ {doctor.CurrentFee}/-</h5></div>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Commisson acquired: ₹ {doctor.TotalCommissionEarned}/-</h5></div>
                                        </div>
                                        <div className='w-2/5'>
                                        {/* <div className="my-2"><h5 className='font-semibold text-lg'>Amount Pending: ₹ {doctor.PendingPayment}/-</h5></div> */}
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Speciality: {doctor.speciality}</h5></div>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Total Appointments Taken: {doctor.TotalAppointments}</h5></div>
                                        </div>
                                        {/* <button type='button' onClick={()=>paymentHandler(doctor._id,doctor.doctorId)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ">
                                            Approve Payment
                                        </button> */}
                                        <h5 className='font-semibold text-green-600'>No pending payment</h5>
                                    </div>:<div className="flex bg-red-100 items-center border-b py-2 mt-3">
                                        <div className='flex flex-col w-2/5 m-3'>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Name: {doctor.doctorName} ({doctor.doctorId})</h5></div>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Current Fee: ₹ {doctor.CurrentFee}/-</h5></div>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Commisson acquired: ₹ {doctor.TotalCommissionEarned}/-</h5></div>
                                        </div>
                                        <div className='w-2/5'>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Amount Pending: ₹ {doctor.PendingPayment}/-</h5></div>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Speciality: {doctor.speciality}</h5></div>
                                        <div className="my-2"><h5 className='font-semibold text-lg'>Total Appointments Taken: {doctor.TotalAppointments}</h5></div>
                                        </div>
                                        <button type='button' onClick={()=>paymentHandler(doctor._id,doctor.doctorId)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ">
                                            Approve Payment
                                        </button>
                                    </div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPanel;



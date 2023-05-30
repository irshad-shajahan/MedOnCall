import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import {  useSubmitReviewMutation } from '../../redux/features/api/apiSlice';
import { getrequest } from '../../axios/apiCalls';

const UserAppointmentRecords = ({ appointments,socket,refetch}) => {
    const [submitReview, reviewActions] = useSubmitReviewMutation()
    function prescriptionDownload(id,name) {
        getrequest(`/downloadPrescription/${id}`).then((response) => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, `${name} Prescription.pdf`);
          })
          .catch(() => {
          });
    }

    const [rating, setRating] = useState(0);

    const handleRatingChange = (selectedRating) => {
        setRating(selectedRating);
    };
    const [review, setReview] = useState('');

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };
    const handleSubmitReview = (appointmentId, doctorId) => {
        const feedback = {
            appointmentId,
            doctorId,
            review,
            rating
        }
        if (!reviewActions.isLoading && review && rating !== 0) {
            submitReview(feedback).then((res) => {
                if(res?.data.success){
                    if (res?.data.success) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Review submitted successfully',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK',
                            customClass: {
                              popup: 'custom-swal-popup',
                              title: 'custom-swal-title',
                              content: 'custom-swal-content',
                            },
                          });
                    }
                }
            })
        }
        // Clear the input field
        setReview('');
    };
    useEffect(()=>{
            const handlePrescriptionDone = () => {
                toast.info("Your prescription is ready for download", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                    draggable: false,
                  });
                  refetch()
              };   
              socket.current.on('getPrescriptionDone', handlePrescriptionDone);
              return () => {
                socket.current.off('getPrescriptionDone', handlePrescriptionDone);
              };
      },[])
    function averagerating(ratings) {
        if (ratings.length === 0) {
            return 0
        } if (ratings.length === 1) {
            return ratings[0]
        }
        let total = 0;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < ratings.length; i++) {
            total += ratings[i]
        }
        return (total / ratings.length)

    }
    return (
        <div className="bg-gray-100 p-4 rounded-lg w-full overflow-y-auto max-h-screen">
            <h2 className="text-lg font-semibold mb-4">Appointments</h2>
            {appointments?.map((appointment) => (

                <div className='mb-4 bg-white shadow rounded-lg pb-4'>
                    {appointment.prescriptionDone ? null : (<div className='bg-yellow-500 rounded-t-md'><p className='font-semibold text-white px-5'>Just a moment, Doctor is working on your prescription.</p></div>)}
                    <div
                        key={appointment.id}
                        className="w-full p-4 flex justify-between items-center"
                    >
                        <div className='w-[7%]'>
                            <img className='rounded-xl' src={appointment.profileImage} alt="" />
                        </div>
                        <div className='w-[40%]'>
                            <h3 className="text-xl font-semibold mb-2">
                                Dr.{appointment.doctorName}
                            </h3>
                            <p className="text-gray-600">Appointment ID: {appointment._id}</p>
                            <p className="text-green-600 font-semibold">Session Completed</p>
                        </div>
                        <div className='w-[30%]'>
                            <h5 className="text-red-600 font-semibold text-xl ">Time: {appointment.time}</h5>
                            <p className="text-gray-600">Date: {appointment.date}</p>
                        </div>
                        <div className='w-[15%]'>

                            {appointment.prescriptionDone ? (
                                <button
                                    type="button" onClick={()=>prescriptionDownload(appointment._id,appointment.prescription.patientName)}
                                    className="bg-green-500 rounded-md text-sm font-semibold text-white p-2"
                                >
                                    Download Prescription
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="bg-gray-300 rounded-md text-sm font-semibold text-gray-400 p-2 cursor-not-allowed"
                                >
                                    Download Prescription
                                </button>
                            )}

                        </div>
                    </div>
                    <div className='flex mx-5 justify-between'>
                        <div className='flex flex-col w-1/4'>
                            <h4 className='my-2 font-semibold text-lg'>Rate the Session</h4>
                            <div className='flex'>
                                {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;

                                    return (
                                        // eslint-disable-next-line jsx-a11y/label-has-associated-control
                                        <label key={ratingValue}>
                                            <input
                                                type="radio"
                                                name="rating" hidden
                                                value={ratingValue}
                                                onClick={() => handleRatingChange(ratingValue)}
                                            />
                                            {appointment.rating.length !== 0 ? <FaStar
                                                className="star text-xl"
                                                color={ratingValue <= averagerating(appointment.rating) ? '#ffc107' : '#e4e5e9'}
                                            /> : <FaStar
                                                className="star text-xl"
                                                color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                                            />}

                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                        {appointment.reviews?<div className='w-3/4 border p-1'><p className=''>{appointment.reviews}</p></div>:<div className='flex w-3/4'>
                            <textarea className='border h-full w-full'
                                value={review}
                                onChange={handleReviewChange}
                                placeholder="Write your review..."
                            />
                            <button onClick={() => handleSubmitReview(appointment._id, appointment.DoctorId)} type='button' className='bg-blue-700 px-5 text-white font-semibold rounded m-3'>
                                Submit
                            </button>
                        </div>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserAppointmentRecords;

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { useSubmitReviewMutation } from '../../redux/features/api/apiSlice';
import { getrequest } from '../../axios/apiCalls';

const UserAppointmentRecords = ({ appointments, socket, refetch }) => {
    const [submitReview, reviewActions] = useSubmitReviewMutation()
    function prescriptionDownload(id, name) {
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
                if (res?.data.success) {
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
    useEffect(() => {
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
    }, [])
    function averageRating(ratings) {
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

                <div className='mb-4 p-2 bg-white shadow rounded-lg pb-4'>
                    {appointment.prescriptionDone ? null : (<div className='bg-yellow-500 rounded-t-md'><p className='font-semibold text-white px-5'>Just a moment, Doctor is working on your prescription.</p></div>)}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                        <div className="md:w-16 w-1/3">
                            <img className="rounded-xl mb-4 sm:mb-0" src={appointment.profileImage} alt="" />
                        </div>
                        <div className="flex flex-col sm:ml-4 sm:flex-row sm:w-3/4">
                            <div className="w-full sm:w-1/2">
                                <h3 className="text-xl font-semibold mb-2">Dr. {appointment.doctorName}</h3>
                                <p className="text-gray-600">Appointment ID: {appointment._id}</p>
                                <p className="text-green-600 font-semibold">Session Completed</p>
                            </div>
                            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                                <h5 className="text-red-600 font-semibold text-xl">Time: {appointment.time}</h5>
                                <p className="text-gray-600">Date: {appointment.date}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            {appointment.prescriptionDone ? (
                                <button
                                    type="button" onClick={() => prescriptionDownload(appointment._id, appointment.prescription.patientName)}
                                    className="bg-green-500 rounded-md text-xs p-1 md:text-sm font-semibold text-white md:p-2"
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
                    <div className="flex flex-col mx-5 lg:flex-row justify-between">
                        <div className="flex flex-col w-full lg:w-1/4">
                            <h4 className="my-2 font-semibold text-lg">Rate the Session</h4>
                            <div className="flex">
                                {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={ratingValue}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                hidden
                                                value={ratingValue}
                                                onClick={() => handleRatingChange(ratingValue)}
                                            />
                                            {appointment.rating.length !== 0 ? (
                                                <FaStar
                                                    className="star text-xl"
                                                    color={ratingValue <= averageRating(appointment.rating) ? '#ffc107' : '#e4e5e9'}
                                                />
                                            ) : (
                                                <FaStar
                                                    className="star text-xl"
                                                    color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                                                />
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                        {appointment.reviews ? (
                            <div className="w-full lg:w-3/4 border p-1">
                                <p className="">{appointment.reviews}</p>
                            </div>
                        ) : (
                            <div className="flex w-full lg:w-3/4">
                                <textarea
                                    className="border h-full w-full"
                                    value={review}
                                    onChange={handleReviewChange}
                                    placeholder="Write your review..."
                                />
                                <button
                                    onClick={() => handleSubmitReview(appointment._id, appointment.DoctorId)}
                                    type="button"
                                    className="bg-blue-700 px-5 text-white font-semibold rounded m-3"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default UserAppointmentRecords;

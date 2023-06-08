/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import Navbar from '../../components/navbar/navbar';
import { useCreateCheckOutSessionMutation, useFetchDoctorProfileQuery } from '../../redux/features/api/apiSlice';
import WentWrong from '../../components/WentWrong';
import { hideLoading, showloading } from '../../redux/features/alertSlice';

function DoctorDetails() {
  const dispatch = useDispatch()
  const [createCheckoutSession, checkoutActions] = useCreateCheckOutSessionMutation()
  const params = useParams();
  const [timeSlots, setTimeSlots] = useState(null)
  const wildcardParamValue = params['*'];
  const [divsts, setdivstst] = useState(false)
  const [slot, setSlot] = useState(null);
  const { data, isSuccess, isLoading } =
    useFetchDoctorProfileQuery(wildcardParamValue);
  const [anotherDate, setAnotherDate] = useState(false);
  const navigate = useNavigate();
  const doctor = data?.doctor
  const dd = new Date();
  const maxDate = new Date();
  maxDate.setDate(dd.getDate() + 30);
  const paymentNavigate = (t) => {
    dispatch(showloading())
    if (anotherDate) {
      if (slot) {
        const bookingData = {
          time: t,
          doctorId: doctor?._id,
          sessionDate: slot.startDate,
        }
        if (!checkoutActions.isLoading) {
          createCheckoutSession(bookingData).then((res) => {
            if (res?.data.success) {
              dispatch(hideLoading())
              window.location.href = res?.data.url
            }
          })
        }
      } else {
        toast.warning('Please select the date');
        dispatch(hideLoading())
      }
    } else {
      const today = new Date();
      maxDate.setDate(today.getDate() + 30);
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Month index starts from 0, so we add 1
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`
      const bookingData = {
        time: t,
        doctorId: doctor?._id,
        sessionDate: formattedDate,
      };
      if (!checkoutActions.isLoading) {
        createCheckoutSession(bookingData).then((res) => {
          if (res?.data?.success) {
            dispatch(hideLoading())
            window.location.href = res?.data.url
          }
        })
      }
    }
  };
  const anotherDateHandler = () => {
    if (anotherDate) {
      setAnotherDate(false);
    } else {
      setAnotherDate(true);
    }
  };
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setTimeSlots(doctor?.timeSlots)
    }
  }, [isLoading])
  function disableSlots(value) {
    const checkBooked = doctor?.bookedSlots.find((booking) => booking.date === value);
    const today = new Date(); // Get the current date and time
  
    if (checkBooked) {
      const bookedTimeSlots = checkBooked.slots;
      if (bookedTimeSlots?.length !== 0) {
        const updatedTimeSlots = timeSlots.map((elem) => {
          const isBooked = bookedTimeSlots.some((secElem) => elem.time === secElem.time);
          const isPast = new Date(`${value} ${elem.time}`) < today; // Check if the time slot is in the past
          return {
            ...elem,
            status: !isBooked && !isPast, // Update the status based on whether the time slot is booked or in the past
          };
        });
        setTimeSlots(updatedTimeSlots);
      }
    } else {
      // No bookings for the date, set all statuses to true excluding past time slots
      const updatedTimeSlots = timeSlots.map((elem) => ({
        ...elem,
        status: new Date(`${value} ${elem.time}`) >= today, // Exclude past time slots
      }));
      setTimeSlots(updatedTimeSlots);
    }
  }
  

  const handleValueChange = (value) => {
    disableSlots(value.startDate)
    setSlot(value);
  };
  if (isLoading) {
    dispatch(showloading())
  } else {
    dispatch(hideLoading())
  }
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

  useEffect(() => {
    if (timeSlots) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Month index starts from 0, so we add 1
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`
      disableSlots(formattedDate)
    }
  }, [divsts])
  if (!isSuccess && !isLoading) {
    return (
      <div>
        <WentWrong />
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div>
        <Navbar>
          <section className=" bg-blueGray-50">
            <div className="container mx-auto">
              <div className="flex m-8 md:items-center">
                <div className=" md:w-[22%]  md:px-4 mr-auto ml-auto">
                  <div className=" flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-blue-900 rounded-2xl">
                    <div className='w-40 md:w-full'>
                      <img
                        alt="..."
                        src={doctor?.additionalDetails.profileImage}
                        className="w-full align-middle rounded"
                      />
                    </div>
                    <blockquote className="p-1 mb-4 text-center">
                      <h2 className="text-2xl \ font-semibold text-white">
                        {doctor?.name}
                      </h2>
                      <p className="text-lg font-light  text-white">
                        {doctor?.additionalDetails.qualification}
                      </p>
                    </blockquote>
                  </div>
                </div>

                <div className=" md:w-[30%]">
                  <div className="flex flex-wrap">
                    <div className="w-[45%] px-4 hidden md:block">
                      <div className=" flex flex-col h-[35%]">
                        <div className="px-4 flex-auto">
                          <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                            <ion-icon name="school" />
                          </div>
                          <h6 className="text-base mb-1 font-semibold">
                            Qualification
                          </h6>
                          <p className="mb-4 text-blueGray-500 text-base">
                            {doctor?.additionalDetails.qualification}
                          </p>
                        </div>
                      </div>
                      <div className=" flex flex-col min-w-0">
                        <div className="px-4 flex-auto">
                          <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                            <ion-icon name="language" />
                          </div>
                          <h6 className="text-base mb-1 font-semibold">
                            Languages
                          </h6>
                          <p className="mb-4 text-blueGray-500 text-base">
                            English, Hindi, Malayalam
                          </p>
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <div className=" flex flex-col min-w-0">
                          <div className="px- flex-auto">
                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                              <ion-icon name="card" />
                            </div>
                            <h6 className="text-base mb-1 font-semibold">Fee</h6>
                            <p className="mb-4 text-blueGray-500 text-base">
                              ₹ {doctor?.additionalDetails.Fee}/-
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-6/12 px-4 md:block hidden">
                      <div className="flex flex-col min-w-0 mt-2">
                        <div className="px-4 py- flex-auto">
                          <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                            <ion-icon name="checkmark-done" />
                          </div>
                          <h6 className="text-base mb-1 font-semibold">
                            Specializations
                          </h6>
                          <p className="mb-4 text-blueGray-500 text-base">
                            {doctor?.additionalDetails.speciality}
                          </p>
                        </div>
                      </div>

                      <div className=" flex flex-col min-w-0 ">
                        <div className="px-4 py-5 flex-auto">
                          <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                            <ion-icon name="accessibility" />
                          </div>
                          <h6 className="text-base mb-1 font-semibold">
                            Consulting since
                          </h6>
                          <p className="mb-4 text-blueGray-500 text-base">
                            {doctor?.additionalDetails.regYear}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="md:w-[50%] px-4 mb-10">
                  <div className="h-auto mb-5 md:w-full w-40 rounded-lg border-2 border-dashed border-gray-600" onMouseEnter={() => setdivstst(true)}>
                    <h5 className="text-lg font-semibold text-center mt-2">
                      SELECT YOUR CONVENIENT SLOT
                    </h5>
                    {divsts ? <div className='transition-all duration-1000 transi'>
                      <h5 className="font-semibold m-4">
                        Booking for {' '}
                        <span
                          type="button"
                          onClick={anotherDateHandler}
                          className="cursor-pointer text-blue-500"
                        >
                          another date?
                        </span>
                      </h5>
                      {anotherDate ? (
                        <div className="flex justify-center p-2 border-b-2 border-double border-gray-500 transition-all duration-700">
                          {/* <Calender type="date" name="date" onChange={selectDate} /> */}
                          <Datepicker
                            asSingle
                            primaryColor="red"
                            value={slot}
                            minDate={new Date()}
                            maxDate={maxDate}
                            disabledDates={doctor?.leaveDates}
                            onChange={handleValueChange}
                          />
                        </div>
                      ) : (
                        ''
                      )}

                      <div className="grid mt-3 pb-2 md:grid-cols-3 sm:grid-cols-2 text-center">
                        {timeSlots?.length > 0
                          ? timeSlots.map((element, i) =>
                            !element.status ? (
                              <div
                                className="w-20 h-12 ml-12 mt-5 bg-red-100 border-2 border-red-700 rounded flex disabled items-center justify-center"
                                disabled
                              >
                                {element.time}
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  paymentNavigate(element.time);
                                }}
                                className="w-20 h-12 ml-12 mt-5 bg-green-100 border-2 border-green-700 rounded flex disabled items-center justify-center hover:bg-slate-500 cursor-pointer"
                              >
                                <p
                                  key={i}
                                  className={
                                    element.booked
                                      ? 'text-red-500'
                                      : 'text-blue-900'
                                  }
                                >
                                  {element.time}
                                </p>
                              </div>
                            )
                          )
                          : doctor?.timeSlots.map((element, i) => (
                            <div
                              onClick={() => {
                                navigate('/user/paymentWIndow', {
                                  state: {
                                    time: element.time,
                                    // eslint-disable-next-line no-underscore-dangle
                                    doctorId: doctor._id,
                                    sessionDate: slot.startDate,
                                  },
                                });
                              }}
                              className="w-20 h-12 ml-12 mt-5 bg-green-100 border-2 border-green-700 rounded flex items-center justify-center hover:bg-slate-500 cursor-pointer"
                            >
                              <p
                                key={i}
                                className={
                                  element.booked
                                    ? 'text-red-500'
                                    : 'text-blue-900'
                                }
                              >
                                {element.time}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div> : ''}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Doctor Rating</h3>
                <div className="flex">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;

                    return (
                      <FaStar
                        className="star text-xl"
                        color={
                          ratingValue <= averagerating(doctor?.feedback.rating)
                            ? '#ffc107'
                            : '#e4e5e9'
                        }
                      />
                    );
                  })}
                </div>
              </div>

              <div className="w-70 mx-auto">
                <h3 className="font-semibold text-xl">Top Reviews</h3>
                <div className="overflow-x-auto">
                  <div className="flex reviews-container">
                    {doctor?.feedback.review.map((review, index) => (
                      <div key={index} className="p-2 flex-shrink-0">
                        <div className="bg-white rounded-lg p-4 border h-32 w-80 flex flex-col justify-between">
                          <h6 className="text-gray-400">Anonymous</h6>
                          <p className="font-semibold text-lg line-clamp-3">
                            {review}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


            </div>
          </section>
        </Navbar>
      </div>
    );
  }
}

export default DoctorDetails;

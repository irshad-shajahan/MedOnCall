/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import { toast } from 'react-toastify';
import Navbar from '../../components/navbar/navbar';
import { useFetchDoctorProfileQuery } from '../../redux/features/api/apiSlice';
import WentWrong from '../../components/WentWrong';

function DoctorDetails() {
  const params = useParams();
  const wildcardParamValue = params['*'];
  const [slot, setSlot] = useState(null);
  const { data, isSuccess, isLoading, isFetching } =
    useFetchDoctorProfileQuery(wildcardParamValue);
  const [doctor, setDoctor] = useState(null);
  const [anotherDate, setAnotherDate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setDoctor(data.doctor);
    }
  });
  if (!isSuccess) {
    return (
      <div>
        <WentWrong />
      </div>
    );
  }
  if (!data.success) {
    return (
      <div>
        <WentWrong />
      </div>
    );
  }
  const paymentNavigate = (t) => {
    if (anotherDate) {
      if (slot) {
        navigate('/user/paymentScreen', {
          state: {
            time: t,
            // eslint-disable-next-line no-underscore-dangle
            doctorId: doctor?._id,
            sessionDate: slot.startDate,
          },
        });
      } else {
        toast.warning('Please select the date');
      }
    } else {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Month index starts from 0, so we add 1
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      navigate('/user/paymentScreen', {
        state: {
          time: t,
          // eslint-disable-next-line no-underscore-dangle
          doctorId: doctor?._id,
          sessionDate: formattedDate,
        },
      });
    }
  };
  const anotherDateHandler = () => {
    if (anotherDate) {
      setAnotherDate(false);
    } else {
      setAnotherDate(true);
    }
  };
  const handleValueChange = (value) => {
    setSlot(value);
  };
  return (
    <div>
      <Navbar>
        <section className=" bg-blueGray-50">
          <div className="container mx-auto">
            <div className="flex m-8 items-center">
              <div className=" md:w-[22%] px-12 md:px-4 mr-auto ml-auto">
                <div className=" flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-blue-900 rounded-2xl">
                  <div>
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
                  <div className="w-[45%] px-4">
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

                  <div className="w-full md:w-6/12 px-4">
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
              <div className="w-[50%] px-4 mb-10">
                    <div className="h-auto mb-5 rounded-lg border-2 border-dashed border-gray-600">
                      <h5 className="text-lg font-semibold text-center mt-2">
                        SELECT YOUR CONVENIENT SLOT
                      </h5>
                      <h5 className="font-semibold m-4">
                        Booking for{' '}
                        <span
                          type="button"
                          onClick={anotherDateHandler}
                          className="cursor-pointer text-blue-500"
                        >
                          {' '}
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
                            disabledDates={data?.leaveDates}
                            onChange={handleValueChange}
                          />
                        </div>
                      ) : (
                        ''
                      )}

                      <div className="grid mt-3 pb-2 md:grid-cols-3 sm:grid-cols-2 text-center">
                        {doctor?.timeSlots.length > 0
                          ? doctor?.timeSlots.map((element, i) =>
                              element.booked ? (
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
                    </div>
                  </div>
            </div>
          </div>
        </section>
      </Navbar>
    </div>
  );
}

export default DoctorDetails;

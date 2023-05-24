/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Datepicker from 'react-tailwindcss-datepicker';
import { useDispatch } from 'react-redux';
import DocNavbar from '../../components/navbar/docNavbar';
import axios from '../../axios/axios';
import { useFetchDocLeaveDatesQuery, useFetchTimeSlotQuery, useRemoveLeaveMutation, useUpdateDocLeaveMutation, useUpdateTimeSlotMutation } from '../../redux/features/api/apiSlice';
import {showloading,hideLoading} from '../../redux/features/alertSlice'

function Availability(props) {
  const [leave, setLeave] = useState({ 
    startDate: new Date(), 
    endDate: new Date().setMonth(11) 
    }); 
    const {data,isSuccess,isLoading} = useFetchDocLeaveDatesQuery()
    const dispatch = useDispatch()
    const [month, setMonth] = useState();
    const morning = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'];
    const afternoon = ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];
    const evening = ['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];
    const [selectLeaveDate, setSelectLeaveDate] = useState(false);
    const [updateLeave,action] = useUpdateDocLeaveMutation() 
    const [deleteLeave,leaveAction] = useRemoveLeaveMutation()
    const [timeSlot, SetTimeSlot] = useState([]);
    const [updateTimeSlot,timeSlotAction] = useUpdateTimeSlotMutation()
    const fetchTimeSlot = useFetchTimeSlotQuery()



  const [selectedSlot, setSelectedSlot] = useState([]);
  const submitSlots = (e) => {
    e.preventDefault();
    updateTimeSlot({timeSlot})
  };

  useEffect(() => {
    const currentDate = new Date();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'Septemper',
      'October',
      'November',
      'December',
    ];
    const currentMonth = monthNames[currentDate.getMonth()];
    setMonth(currentMonth);
  }, []);
  function selectLeave(){
    if(!action.isLoading){
      updateLeave(leave).then((res)=>{
        if(res.data.success){
          toast.success('succesfully added leave')
        }else{
          toast.error('error occurred')
        }
      })
    }
  }
  useEffect(()=>{
    if(action.isLoading){
      dispatch(showloading())
    }else{
      dispatch(hideLoading())
    }
    },[action.isLoading])

  const handleValueChange = (newValue) => {
    setSelectLeaveDate(true);
    setLeave(newValue); 
    } 
    const removeLeave = (date)=>{
      deleteLeave({date})
    }
  return (
    <div>
      <DocNavbar>
        <div
          id="alert-border-1"
          className="flex flex-row justify-between p-2 text-blue-800 border-t-4 border-blue-300 bg-blue-300"
          role="alert"
        >
          <div>
            <svg
              className="m-0 w-5 h-10  inline-block"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-2 m-0  inline-block font-semibold text-xl text-black text-center">
              This is the time slot for <u>{month}</u> month
            </p>
          </div>

          <div className='flex items-center w-1/2'>
            <h5 className="mr-2 inline-block  items-end text-lg font-bold text-blue-900 tracking-tight">
              Planning for a leave?
            </h5>
            <Datepicker
            
            primaryColor='red'
            disabledDates={data?.leaveDates}
            value={leave} 
            onChange={handleValueChange} 
            />

            {selectLeaveDate && (
              <button
                type="button"
                onClick={selectLeave}
                className="max-w-md px-4 py-2 ml-2 tracking-wide inline-block text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-purple-600"
              >
                Done
              </button>
            )}
          </div>
        </div>

        <div>
          <h5 className="mb-2 mt-4 text-base font-semibold tracking-tight text-gray-900">
            Your selected time slot
          </h5>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 max-w-screen-md sm:flex">
            {fetchTimeSlot?.data?.timeSlot.map((slot) => (
              <li className="w-[150px] border-b border-green-500  sm:border">
                <div className="flex flex-row items-center justify-around">
                  <label
                    htmlFor="vue-checkbox-list"
                    className="py-3  text-sm font-medium text-gray-900 text-center inline-block"
                  >
                    {slot.time}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-2 mt-4 text-base font-semibold  tracking-tight text-gray-900">
            Your leave dates
          </h5>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex">
            {data?.leaveDates?.map((leaveDate) => (
              <li className="w-auto  border-b bg-red-100 border-blue-300  sm:border">
                <span className='float-right text-red-500 text-base cursor-pointer' onClick={()=>removeLeave(leaveDate)}><ion-icon name="close-circle"/></span>
                <div className="flex p-2 flex-row justify-center items-center">
                  <label
                    htmlFor="vue-checkbox-list"
                    className="py-3 text-sm font-medium text-gray-900"
                  >
                    {leaveDate.startDate} - {leaveDate.endDate}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          href="#"
          className="block max-w-full mt-2 p-6 bg-blue-900 border border-gray-200 rounded-lg shadow-md"
        >

          <form onSubmit={(e) => submitSlots(e)}>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Morning
            </h5>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex">
              {morning.map((time) => (
                <li className="w-full border-b hover:bg-gray-200 border-gray-200 sm:border-b-0 sm:border-r">
                  <div className="flex items-center pl-3">
                    <input
                      id="vue-checkbox-list"
                      type="checkbox"
                      value={time}
                      name="slot"
                      className="w-4 h-4 text-blue-600  bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={(e) =>
                        e.target.checked
                          ? SetTimeSlot([
                              ...timeSlot,
                              { time: e.target.value, status: true },
                            ])
                          : SetTimeSlot(
                              timeSlot.filter((element) => {
                                if (element.time === e.target.value) {
                                  return;
                                }
                                return element;
                              })
                            )
                      }
                    />
                    <label
                      htmlFor="vue-checkbox-list"
                      className="py-3 ml-2 w-full text-sm font-medium text-"
                    >
                      {time}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <h5 className="mb-2 mt-4 text-xl font-bold tracking-tight text-white text-center">
              Afternoon
            </h5>
            <ul className="items-center w-full text-sm font-medium bg-white rounded-lg border border-gray-200 sm:flex">
              {afternoon.map((time) => (
                <li className="w-full border-b border-gray-200 sm:border-b-0 hover:bg-gray-200 sm:border-r">
                  <div className="flex items-center pl-3">
                    <input
                      id="react-checkbox-list"
                      type="checkbox"
                      value={time}
                      name="slot"
                      className="w-4 h-4 text-black bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={(e) =>
                        e.target.checked
                          ? SetTimeSlot([
                              ...timeSlot,
                              { time: e.target.value, status: true },
                            ])
                          : SetTimeSlot(
                              timeSlot.filter((element) => {
                                if (element.time === e.target.value) {
                                  return;
                                }
                                return element;
                              })
                            )
                      }
                    />
                    <label
                      htmlFor="react-checkbox-list"
                      className="py-3 ml-2 w-full text-sm font-medium"
                    >
                      {time}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <h5 className="mb-2 mt-4 text-xl font-bold tracking-tight text-white  text-center">
              Evening
            </h5>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex">
              {evening.map((time) => (
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r hover:bg-gray-200">
                  <div className="flex items-center pl-3">
                    <input
                      id="react-checkbox-list"
                      type="checkbox"
                      value={time}
                      name="slot"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={(e) =>
                        e.target.checked
                          ? SetTimeSlot([
                              ...timeSlot,
                              { time: e.target.value, status: true },
                            ])
                          : SetTimeSlot(
                              timeSlot.filter((element) => {
                                if (element.time === e.target.value) {
                                  return;
                                }
                                return element;
                              })
                            )
                      }
                    />
                    <label
                      htmlFor="react-checkbox-list"
                      className="py-3 ml-2 w-full text-sm font-medium text-gray-900 "
                    >
                      {time}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            {/* <input type="text" value={counselor.auth.data._id} hidden 
                    onChange={(e)=>
                    /> */}

            <div className="mt-3 flex mx-auto justify-center">
              <button
                type="submit"
                className="max-w-md px-4 py-2 tracking-wide text-blue-900 font-bold transition-colors duration-200 transform bg-white rounded-md hover:bg-blue-300 focus:outline-none focus:bg-purple-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </DocNavbar>
    </div>
  );
}

export default Availability;

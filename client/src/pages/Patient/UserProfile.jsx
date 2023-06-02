/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React,{ useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/Sidebar';
import { useFetchAppointmentsCountQuery, useGetUserDetailsQuery, useUpdateUserProfileMutation } from '../../redux/features/api/apiSlice';
import WentWrong from '../../components/WentWrong';

const UserProfilePage = () => {
    const {data,isLoading,isSuccess} = useGetUserDetailsQuery()
    const appointments = useFetchAppointmentsCountQuery()
    const User = data?.data
  const [name, setName] = useState(User?.name);
  const [phone, setPhone] = useState(User?.phone);
    const [updateProfile,actions] = useUpdateUserProfileMutation()
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  function updateHandler(){
    const udata={
        name,
        phone
    }
    if(name && phone){
        if(!actions.isLoading){
            updateProfile(udata).then((res)=>{
                if(res?.data.success){
                    toast.success("updated successfully")
                }
            })
        }else{
            toast.error("please fill the fields to continue")
        }
    }
  }
  if(!isLoading && !isSuccess){
    return(
        <WentWrong/>
    )
  }
  return (
    <div>
        <Navbar>
         <div className='flex'>
         <SideBar active={0}/>
         <div className='flex w-3/4 justify-center m-5'>
         <div className=" w-full p-5">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Total Consultations</h2>
          <div className="bg-blue-100 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">You have attended {appointments?.data?.count} consultations</h3>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Edit your Profile</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-400 rounded w-full py-2 px-3"
              value={User?.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="border border-gray-400 rounded w-full py-2 px-3"
              value={User?.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <button onClick={updateHandler} type='button' className='bg-blue-800 text-white text-lg font-semibold px-4 rounded-md py-2'>Update</button>
        </div>
      </div>
    </div>
         </div>
         </div>
        </Navbar>
    </div>
  );
};

export default UserProfilePage;

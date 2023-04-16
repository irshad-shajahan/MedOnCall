/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import NavBar from '../components/navbar/NavBar';
import { getdata } from '../axios/apicall';

function DoctorPanel() {
  const [userData, SetData] = useState([]);
  const navigate = useNavigate()
  const columns = [
    { name: 'Name', selector: (row) => row.name },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: 'Verification Status',
      selector: (row) => (<span className={row.isVerified?'text-green-500 font-semibold text-base':'text-red-500 text-base font-semibold'}>{row.isVerified?"Verified":"Not Verified"}</span>)
    },
    {
        name: 'Details',
        selector: (row) => (row.isProfileComplete?<button onClick={()=>navigate('/doctordetails',{state:row._id})} className='rounded bg-blue-700 w-auto px-2 text-white font-semibold my-6 mx-auto py-2' type='button'>View Details</button>:<span className='font-bold text-red-500 text-base'>Incomplete Profile</span>),
      },
  ];
  const getUserData = async () => {
    try {
      getdata('/doctorpanel').then((res)=>{
          if (res.data.success) {
            SetData(res.data.users);
          }
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      getUserData();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="w-full min-h-[90vh] grid grid-cols-12">
        <NavBar />
        <div className="grid grid-cols-1  w-full col-span-10">
          <DataTable columns={columns} data={userData} />
        </div>
      </div>
    </div>
  );
}

export default DoctorPanel;

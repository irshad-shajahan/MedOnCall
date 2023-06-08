import React, { useEffect, useState } from 'react';
import { getdata } from '../../axios/apicall';

function LeftPart() {
  const [count, setCount] = useState({ doctor: 0, patient: 0 })
  const [revenue,setRevenue] = useState(null)
  function getcount() {
    getdata('/docpatientcount').then((res) => {
      const data = {
        doctor: res?.data.Dcount,
        patient: res?.data.Pcount

      }
      setCount(data)
    })
  }
  function getTotalRevenue(){
    getdata('/totalrevenue').then((res)=>{
      setRevenue(res?.data?.totalRevenue)
    })
  }
  useEffect(() => {
    getcount()
    getTotalRevenue()
  }, [])
  return (
    <div className="col-span-2 min-h-[90vh] border-r border-feay-200 items-start justify-start flex flex-col w-full">
      <div className="w-full items-start justify-start flex flex-col px-12 pt-12 pb-6">
        <div className="w-80  border border-gray-200 rounded-lg shadow ml-5 bg-blue-900">
          <h1 className='text-xl font-bold p-6 text-white'>Registered Doctors</h1>
          <div className="max-w-sm  bborder-gray-200 rounded-b-lg shadow  bg-blue-500">
            <h1 className='text-3xl font-bold p-2 text-white text-right mr-5'>{count.doctor}</h1>
          </div>
        </div>
      </div>
      <div className="w- items-start justify-start flex flex-col px-12 pt-12 pb-6">
        <div className="w-80  border border-gray-200 rounded-lg shadow ml-5 bg-blue-900">
          <h1 className='text-xl font-bold p-6 text-white'>Registered Patients</h1>
          <div className="max-w-sm  bborder-gray-200 rounded-b-lg shadow  bg-blue-500">
            <h1 className='text-3xl font-bold p-2 text-white text-right mr-5'>{count.patient}</h1>
          </div>
        </div>
      </div>
      <div className="w-full items-start justify-start flex flex-col px-12 pt-12 pb-6">
        <div className="w-80  border border-gray-200 rounded-lg shadow ml-5 bg-blue-900">
          <h1 className='text-xl font-bold p-6 text-white'>Total Revenue</h1>
          <div className="max-w-sm  bborder-gray-200 rounded-b-lg shadow  bg-blue-500">
            <h1 className='text-3xl font-bold p-2 text-white text-right mr-5'>₹ {revenue}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftPart;

import React, { useEffect } from 'react';
import { getdata } from '../../axios/apicall';

function LeftPart() {
  function getcount(){
    getdata('/docpatientcount').then((res)=>{
      console.log(res);
    })
  }
  useEffect(()=>{
    getcount()
  },[])
  return (
    <div className="col-span-2 min-h-[90vh] border-r border-feay-200 items-start justify-start flex flex-col w-full">
      <div className="w- items-start justify-start flex flex-col px-12 pt-12 pb-6">
      <div className="max-w-sm  border border-gray-200 rounded-lg shadow ml-5 bg-blue-900">
        <h1 className='text-xl font-bold p-6 text-white'>Registered Doctors</h1>
      <div className="max-w-sm  bborder-gray-200 rounded-b-lg shadow  bg-blue-500">
        <h1 className='text-3xl font-bold p-2 text-white text-right mr-5'>5</h1>
      </div>
      </div>
      </div>
      <div className="w- items-start justify-start flex flex-col px-12 pt-12 pb-6">
      <div className="max-w-sm  border border-gray-200 rounded-lg shadow ml-5 bg-blue-900">
        <h1 className='text-xl font-bold p-6 text-white'>Registered Patients</h1>
      <div className="max-w-sm  bborder-gray-200 rounded-b-lg shadow  bg-blue-500">
        <h1 className='text-3xl font-bold p-2 text-white text-right mr-5'>5</h1>
      </div>
      </div>
      </div>

    </div>
  );
}

export default LeftPart;

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TrashIcon } from '@heroicons/react/outline';
import Header from '../components/header/Header';
import NavBar from '../components/navbar/NavBar';
import { postForm, getdata } from '../axios/apicall';

function Manage() {
  const [speciality, setSpeciality] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const handleInputChange = (event) => {
    setSpeciality(event.target.value);
  };

  const handleAddButtonClick = () => {
    postForm('/addSpeciality', { speciality }).then((res) => {
      if (res.data.success) {
        fetchSpeciality()
        toast.success('Added Successfully');
      }else{
        toast.error(res.data.message)
      }
    });
  };
  const deleteSpeciality = (id) =>{
    getdata(`/deleteSpeciality/${id}`).then(()=>{
      fetchSpeciality()
      toast.warning('Deleted')
    })
  }
  function fetchSpeciality(){
    getdata('/getSpeciality').then((res)=>{
      setSpecialities(res?.data?.specialities);
    })
  }
  useEffect(() => {
    fetchSpeciality()
  }, [setSpeciality,setSpecialities]);
  
  return (
    <div>
      <Header />
      <div className="w-full min-h-[90vh] grid grid-cols-12">
        <NavBar />
        <div className="grid grid-cols-1  w-full col-span-10">
          <div className="flex flex-col items-center w-1/2">
            <h1 className="font-semibold text-lg text-center m-5">
              Manage Speciality
            </h1>
            <input
              className="inline-flex w-80 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border-2"
              type="text"
              value={speciality}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="m-2 rounded bg-blue-900 text-white font-bold py-2 w-1/3"
              onClick={handleAddButtonClick}
            >
              Add
            </button>
            <h4 className="text-lg font-semibold text-gray-400 m-3">
              Available Specialities
            </h4>
            <ul className="border border-gray-200 rounded-lg divide-y w-80 divide-gray-200 max-h-72 overflow-y-auto">
              {specialities?.map((elem) => (
                <li className="flex items-center py-3 font-semibold text-base   ">
                  <span className="px-2 mx-4 w-full text-center">
                    {elem?.name}
                  </span>
                  <button type='button' onClick={()=>deleteSpeciality(elem._id)}><TrashIcon className="h-6 w-6 text-red-800" /> </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manage;

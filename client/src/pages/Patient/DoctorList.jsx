/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch } from 'react-redux';
import Navbar from '../../components/navbar/navbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpg';
import { useFetchDoctorsQuery } from '../../redux/features/api/apiSlice';
import WentWrong from '../../components/WentWrong';
import { hideLoading, showloading } from '../../redux/features/alertSlice';

function DoctorList() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const params = useParams();
  const wildcardParamValue = params['*'];
  const { data, isSuccess, isLoading } =
    useFetchDoctorsQuery(wildcardParamValue);
  const [doctors, setDoctors] = useState([]);
  function clickHandler(id) {
    navigate(`/user/doctorDetails/${id}`);
  }
  useEffect(() => {
    if (isSuccess) {
      setDoctors(data?.updatedDoctors);
    }
  }, [isSuccess]);
  if (!isSuccess && !isLoading) {
    return (
      <div>
        <WentWrong />
      </div>
    );
  }
  if(isLoading){
    dispatch(showloading())
  }else{
    dispatch(hideLoading())
  }
if(isSuccess){
  if (data.noDoctor) {
    return (
      <div>
        <Navbar>
          <div className='flex items-center h-screen justify-center flex-col'>
          <p className='text-3xl font-bold uppercase text-red-500'>Sorry :(</p>
          <p className='text-3xl font-bold uppercase'>no doctors in the selected speciality is available</p>
          </div>
        </Navbar>
      </div>
    );
  }
  return (
    <div>
      <Navbar>
        <div className="p-10 flex">
          <div className="flex flex-col w-1/2">
            <h1 className='font-semibold text-xl text-blue-900'>Select Your Preferred Doctor </h1>
            {doctors?.map((doctor) => (
              <div className="flex items-start mt-4">
                <img
                  className="w-16 h-16 rounded-full mr-4"
                  src={doctor.additionalDetails.profileImage}
                  alt="Doctor's "
                />
                <div>
                  <h2 className="text-lg font-semibold">{doctor.name}</h2>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">
                    Availability: {doctor.availability}
                  </p>
                  <p className="text-sm text-gray-500">
                    Rating: {doctor.rating} stars
                  </p>
                  <p className="text-base font-semibold text-black">
                    Specialization: {doctor?.additionalDetails.speciality}
                  </p>
                  <p className="text-sm font-semibold text-black">
                    Experience:{' '}
                    {doctor?.additionalDetails.regYear
                      ? new Date().getFullYear() -
                        doctor.additionalDetails.regYear
                      : 'N/A'}{' '}
                    years
                  </p>
                  <button
                    type="button"
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    // eslint-disable-next-line no-underscore-dangle
                    onClick={() => clickHandler(doctor._id)}
                  >
                    Book an appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/2 md:block hidden">
            <Carousel
              showThumbs={false}
              showArrows={false}
              showIndicators={false}
              showStatus={false}
              autoPlay
              infiniteLoop
              className=""
            >
              <div>
                <img className="rounded-lg" src={img1} alt=" 1" />
              </div>
              <div>
                <img className="rounded-lg" src={img2} alt=" 3" />
              </div>
              <div>
                <img className="rounded-lg" src={img3} alt=" 2" />
              </div>
            </Carousel>
            {/* <img src={img1} alt="" /> */}
          </div>
        </div>
      </Navbar>
    </div>
  );
}

}

export default DoctorList;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { FaStar } from 'react-icons/fa';
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
              <div className="flex items-center mt-4">
                <img
                  className="w-16 h-16 rounded-full mr-4"
                  src={doctor.additionalDetails.profileImage}
                  alt="Doctor's "
                />
                <div className='md:ml-4'>
                  <h2 className="md:text-2xl text-lg font-semibold mb-2">Dr. {doctor.name}</h2>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>

                  <div className='flex'>
                  <p className="md:text-lg md:mb-1 font-semibold">
                    Rating:
                  </p> <div className="flex md:ml-6">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;

                    return (
                      <FaStar
                        className="star md:text-xl"
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
                  <p className="md:text-lg font-semibold md:mb-2 text-black">
                    Specialization: {doctor?.additionalDetails.speciality}
                  </p>
                  <p className="md:text-lg font-semibold text-black">
                    Experience:{' '}
                    {doctor?.additionalDetails.regYear
                      ? new Date().getFullYear() -
                        doctor.additionalDetails.regYear
                      : 'N/A'}{' '}
                    years
                  </p>
                </div>
                  <button
                    type="button"
                    className="mt-2 bg-blue-500 md:ml-36 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    // eslint-disable-next-line no-underscore-dangle
                    onClick={() => clickHandler(doctor._id)}
                  >
                    Book an appointment
                  </button>
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

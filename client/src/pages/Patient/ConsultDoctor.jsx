/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Navbar from '../../components/navbar/navbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Selector from '../../components/miniComponents/Selector';
import { hideLoading, showloading } from '../../redux/features/alertSlice';
import { useFetchSpecialitiesQuery, useUpdatePhoneMutation } from '../../redux/features/api/apiSlice';
import WentWrong from '../../components/WentWrong';

function ConsultDoctor() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, isSuccess,isLoading } = useFetchSpecialitiesQuery();
  console.log(data);
  const user = useSelector((state) => state.user.user);
  const [inputPhone, SetInputPhone] = useState(null)
  const [updatePhone] = useUpdatePhoneMutation()
  const [spclty,setSpclty] = useState('')
  const phoneRef = useRef(null);
  const userPhone = {
    phone:inputPhone
  }
const clickHandle = async()=>{
  dispatch(showloading())
  if(inputPhone){ 
    await updatePhone(userPhone ).then((res)=>{
      if(res.data.success){
        if(spclty!==''){
          navigate(`/user/findDoctors/${spclty}`)
        }else{
          toast.error('please select a speciality')
        }
        dispatch(hideLoading())
      }else{
        dispatch(hideLoading())
        toast.error(res.data.message)
      }
    }).catch(()=>{
      return(
        <WentWrong/>
      )
    })
  }else{
    if(spclty!==''){
      navigate(`/user/findDoctors/${spclty}`)
    }else{
      toast.error('please select a speciality')
    }
    dispatch(hideLoading())
  }
}

useEffect(() => {
  phoneRef.current = user?.phone; 
}, [user]);
  if (!isSuccess && !isLoading) {
    return(
      <div><WentWrong/></div>
      
  )
}
  if(isLoading){
    dispatch(showloading())
  }else{
    dispatch(hideLoading())
  }
    if(isSuccess){
      return (
        <div>
          <Navbar>
            <div className="flex items-center justify-center">
              <div className="shadow-lg w-full md:w-[60%] justify-center box-border flex flex-col md:flex-row h-[65vh] md:mt-20 rounded-lg">
                <div className="w-full md:w-2/3 flex flex-col items-baseline p-6 bg-gray-50">
                  <h1 className="font-bold text-center text-2xl">
                    Consult <span className="text-blue-700">Doctors</span>
                  </h1>
                  <h3 className="m-5 text-xl font-semibold text-center">
                    Enter Your Preferred Speciality
                  </h3>
                  <div className="items-center w-full">
                    <Selector set={setSpclty} specialities={data?.specialities} />
                  </div>
                  <h3 className="m-5 text-base font-semibold text-center">
                    Enter Your Phone Number
                  </h3>
                  <div className="items-center w-full">
                    <input
                      className=" md:w-72 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border-2"
                      type="text" value={phoneRef?.current || null} disabled={phoneRef?.current} onChange={(e)=>{SetInputPhone(e.target.value)}}
                    />
                  </div>
  
                  <button
                    type="button"
                    className="bg-blue-800 mt-5 w-full md:w-32 rounded p-2 text-white font-bold"
                   onClick={clickHandle}>
                    Find Doctors
                  </button>
                </div>
                <div className="justify-center items-center w-1/3 hidden md:flex">
                  <Carousel
                    showThumbs={false}
                    showArrows={false}
                    showIndicators={false}
                    showStatus={false}
                    autoPlay
                    infiniteLoop
                    className="w-40"
                  >
                    <div>
                      <img
                        src="https://www.practo.com/consult/bundles/cwipage/images/ic-chats-v1.png"
                        alt=" 1"
                      />
                      <span className="font-semibold">Free Follow-up</span>
                    </div>
                    <div>
                      <img
                        src="https://www.practo.com/consult/bundles/cwipage/images/qualified_doctors.png"
                        alt=" 2"
                      />
                      <span className="font-semibold">Verified Doctors</span>
                    </div>
                    <div>
                      <img
                        src="https://www.practo.com/consult/bundles/cwipage/images/ic-security-v1.png"
                        alt=" 3"
                      />
                      <span className="font-semibold">Secure Chats</span>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </Navbar>
        </div>
        );
    }
    }
     
  


export default ConsultDoctor;

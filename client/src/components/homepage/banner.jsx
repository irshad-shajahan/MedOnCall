import React from 'react'
import Typed from 'react-typed';
import { useNavigate } from 'react-router-dom';
import imageUrl from '../../assets/bannerbg3.jpeg'

function Banner() {
  const navigate = useNavigate()
  function clickHandler(){
    navigate('/user/consultDoctor')
  }
  return (
    <div className='bg-cover bg-center flex justify-center items-center' style={{backgroundImage: `url(${imageUrl})`}}>
        <div className='max-w-[800px] mt-[-66px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-blue-900 font-bold p-2'>Expert Medic On A Single Call</p>
        <h1 className='md:text-6xl sm:text-5xl text-4xl font-bold md:py-6 font-serif'>Consult Now</h1>
        <div>
        <Typed className='md:text-4xl sm:text-3xl text-xl font-bold' strings={["Expert medical advice, on demand.","Fast, convenient medical consultations.","Talk to a doctor anytime, anywhere.","Skip the waiting room - Join our family"]} typeSpeed={120} backSpeed={140} loop/>
        </div>
        <p className='md:text-xl text-sm mt-2 text-gray-500' >Speak directly with qualified medical professionals in real-time, from anywhere in the world</p>
        <button onClick={clickHandler} className='rounded bg-blue-700 w-[200px] text-white font-semibold my-6 mx-auto py-2' type='button'>Consult Now</button>
        </div>
    </div>
  )
}

export default Banner
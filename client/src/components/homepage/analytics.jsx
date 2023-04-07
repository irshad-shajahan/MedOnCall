import React from 'react';
import img1 from '../../assets/homepage1.jpg';

function analytics() {
  return (
    <div className="w-full bg-purple- py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img src={img1} alt="img" className='w-[500px] mx-auto my-4' />
        <div className='flex flex-col justify-center'> 
          <h1 className='md:text-3xl text-xl font-bold'>Skip the travel! Take Online Doctor Consultation</h1>
          <p className='text-blue-900 font-bold '>Private consultation + Audio call · Starts at just ₹199</p>
          <button className='rounded bg-blue-700 w-[200px] text-white font-semibold my-6 mx-auto py-2' type='button'>Consult Now</button>
        </div>
      </div>
    </div>
  );
}

export default analytics;

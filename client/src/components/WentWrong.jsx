import React from 'react';
import Navbar from './navbar/navbar';
import img from '../assets/error.webp'

function WentWrong() {
  return (
    <Navbar>
      <div className='flex items-center justify-center'>
        <div className='shadow-sm w-full md:w-[60%] justify-center box-border flex flex-col md:flex-row h-[65vh] md:mt-20 rounded-lg'>
            <img src={img} alt="error msg" />
        </div>
      </div>
    </Navbar>
  );
}

export default WentWrong;

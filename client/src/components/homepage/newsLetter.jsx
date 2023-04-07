import React from 'react'

function newsLetter() {
  return (
    <div className='w-full py-16 text-white bg-blue-900 rounded-sm px-4'>
        <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
            <div className='lg:col-span-2 '>
                <h1 className='md:text-3xl sm:text-2xl text-xl font-bold py-2'>Have More Queries? Get In Touch With US....</h1>
                <p>Sign up to our newsletter and stay upto date</p>
            </div>
            <div className='my-4'>
            <div className='flex flex-col  items-center justify-between w-full'>
                <input className='p-3 flex w-full rounded-md text-black' type="email" placeholder='Enter Email' />
                <button className='rounded bg-blue-700 w-[100px] text-white font-semibold my-6 mx-auto py-2' type='button'>Notify Me</button>
            </div>
            <p className='md:text-lg text-sm '>We care about the protection of your data. Read our <span className='text-blue-400 underline'>Privacy Policy.</span></p>
            </div>
        </div>
    </div>
  )
}

export default newsLetter
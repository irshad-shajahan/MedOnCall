import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import '../scrollBarSyles/scrollBar.css'

function SessionRight() {
  return (
    <div className="w-3/12  h-screen items-center bg-gray-100 scroll-container ">
      <div className='h-10 bg-blue-900 rounded-md flex justify-center mt-[1px] items-center'>
        <h5 className='font-semibold text-xl text-white'>Irshad</h5>
      </div>
      <div className="flex flex-col h-2/4 bg-white mx-2 items-center mb-4 justify-center">
        {/* <div className="font-semibold text-xl py-4"></div> */}
        <div className="justify-center items-center h- hidden md:flex">
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
      <div className='justify-center flex flex-col items-center h-1/4'>
        <div className='m-5 justify-center flex flex-col'>
          <h5 className='font-semibold mb-1'>Request Video Call</h5>
          <button type='button' className='bg-blue-900 p-2 font-bold text-2xl text-white rounded-lg hover:bg-indigo-500 duration-700'> <ion-icon name="videocam"/></button>
        </div>
        <div className='justify-center flex flex-col'>
          <button type='button' className='bg-red-500 p-2 flex font-semibold text-white rounded-lg hover:bg-orange-500 duration-700'><span className='flex items-center mt-1 mr-2'><ion-icon name="close-circle-outline"/></span> End Session</button>
        </div>
      </div>
    </div>
  )
}

export default SessionRight
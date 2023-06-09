/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import '../scrollBarSyles/scrollBar.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useEndSessionMutation } from '../../redux/features/api/apiSlice'
import '@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css';

function SessionRight({appointmentId,currentChat,socket,receiverId}) {
  const [showTimer, setShowTimer] = useState(false);
  const [timerCount, setTimerCount] = useState(3);
  const navigate = useNavigate()
  const [endSession,actions] = useEndSessionMutation()
  const User = useSelector((state)=>state.user.user)
  const doc = JSON.parse(localStorage.getItem('check'))
  const getReceiverid = useCallback(() => {
    if (currentChat) {
      return currentChat.members?.filter((elem) => elem !== User?._id)[0];
    }
    return false;
  }, [currentChat, User]);
  useEffect(() => {
    let timer = null;
    if (showTimer) {
      timer = setInterval(() => {
        setTimerCount((prevCount) => {
          if (prevCount === 1) {
            clearInterval(timer);
            handleTimerEnd();
          }
          return prevCount - 1;
        });
      }, 1000);
    }
  
    return () => {
      clearInterval(timer);
    };
  }, [showTimer]);
  
  function handleTimerEnd() {
    if(doc?.isDoctor){
      navigate('/doctor/videoCall',{state:{appointmentId,receiverId}})
    }else{
      navigate('/user/videoCall',{state:{appointmentId,receiverId}})
    }
  }


  function endSessionhandler(){
    const sessionData ={
      appointmentId,
      conversationId:currentChat._id
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to end the session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, end it!',
      customClass: {
        popup: 'my-custom-popup-class',
        container: 'my-custom-container-class',
        content: 'my-custom-content-class',
        confirmButton: 'my-custom-confirm-button-class',
        cancelButton: 'my-custom-cancel-button-class'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if(!actions.isLoading){
          endSession(sessionData).then(()=>{
            socket.current.emit('endSession', {
              receiverid: getReceiverid(),
          })
            if(doc?.isDoctor){
              navigate('/doctor/preparePrescription',{state:{appointmentId,receiverid:receiverId}})
            }else{
              navigate('/user/feedback')
            }
          })
        }
        }
    });
  }

  useEffect(() => {
    socket.current.on('getEndSession', () => {
      Swal.fire({
        title: 'Session Ended',
        text: 'Your session has ended. You will be redirected.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then(() => {
        // Redirect to the desired page
        if(doc?.isDoctor){
          navigate('/doctor/preparePrescription',{state:{appointmentId,receiverid:receiverId}})
        }else{
          navigate('/user/feedback')
        } 
      });
    })
}, [])
  useEffect(() => {
    socket.current.on('getVideoCall', () => {
      Swal.fire({
        title: 'Video Call Request',
        text: 'The patient is requesting a video call.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Accept',
        cancelButtonText: 'Decline',
      }).then((result) => {
        if (result.isConfirmed) {
          toast.success("The call will be initialized soon")
          setShowTimer(true);
        socket.current.emit('videoCallAccepted', {
            receiverid: getReceiverid(),
        });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          toast.warning("You rejected the request")
        socket.current.emit('videoCallRejected', {
            receiverid: getReceiverid(),
        });
        }
      });
    })
}, [socket, getReceiverid])
function requestVideoCall(){
  socket.current.emit('requestVideoCall', {
    receiverid: getReceiverid(),
  })
}
useEffect(() => {
  const handleVideoCallRejected = () => {
    toast.error("The video request was rejected");
  };

  socket.current.on('getvideoCallRejected', handleVideoCallRejected);

  return () => {
    socket.current.off('getvideoCallRejected', handleVideoCallRejected);
  };
}, []);

useEffect(()=>{
  socket.current.on('getvideoCallAccepted', () => {
    setShowTimer(true);
  })
},[])
    
  return (
    <div className="w-3/12  h-screen items-center border-l-2 border-gray-300 rounded-md scroll-container ">
      <div className='h-10 bg-blue-400 rounded-md md:flex hidden justify-center mt-[1px] items-center'>
        <h5 className='font-semibold text-base text-white'>Logged in as : {User?.name}</h5>
      </div>
      <div className="flex flex-col h-2/4 bg-white mx-2 items-center mb-4 justify-center">
        <div className="justify-center items-center hidden md:flex">
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
          <h5 className='font-semibold mb-1 md:block hidden'>Request Video Call</h5>
          {showTimer?(<p className='font-semibold text-red-500'>You will be redirected in {timerCount}</p>):null}
          <button type='button' onClick={requestVideoCall} className='bg-blue-900 p-2 font-bold text-2xl text-white rounded-lg hover:bg-indigo-500 duration-700'> <ion-icon name="videocam"/></button>
        </div>
        <div className='justify-center flex flex-col'>
          <button type='button' onClick={endSessionhandler} className='bg-red-500 p-2 flex font-semibold text-white rounded-lg hover:bg-orange-500 duration-700'><span className='flex items-center mt-1 mr-2'><ion-icon name="call-outline"/></span><span className='hidden md:block'> End Session</span></button>
        </div>
      </div>
    </div>
  )
}

export default SessionRight
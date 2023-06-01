/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import AgoraUIKit  from 'agora-react-uikit';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEndSessionMutation } from '../../redux/features/api/apiSlice';

function VideoCallComponent({videoToken,videoChannel,currentChat,socket,receiverId}) {
  const [endSession,actions] = useEndSessionMutation()
  const User = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const [videocall, setVideocall] = useState(true);
  const doc = JSON.parse(localStorage.getItem('check'))
  function getReceiverid() {
    if (currentChat) {
        return currentChat.members?.filter((elem) => elem !== User?._id)[0]
    }
    return false
}
  const props = {
    rtcProps: {
      appId: '8c8115633818496bb363251d6909fcb0',
      channel: videoChannel,
      token: videoToken, // pass in channel token if the app is in secure mode

    },
    callbacks: {
      EndCall: () =>{
        const data = {
          appointmentId:videoChannel,
          conversationId:currentChat._id
        }
        setVideocall(false)
        if(!actions.isLoading){
          endSession(data).then((res)=>{
            if(res?.data.success){
              socket.current.emit('endSession', {
                receiverid: getReceiverid(),
            })
            if(doc?.isDoctor){
              navigate('/doctor/preparePrescription',{state:{appointmentId:videoChannel,receiverid:receiverId}})
            }else{
              navigate('/user/feedback')
            }
            }
          })
        }
      }
    }
  };

  
  useEffect(() => {
    socket.current.on('getEndSession', () => {
      Swal.fire({
        title: 'Session Ended',
        text: 'Your session has ended. You will be redirected.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then(() => {
        if(doc?.isDoctor){
          navigate('/doctor/preparePrescription',{state:{appointmentId:videoChannel,receiverid:receiverId}})
        }else{
          navigate('/user/feedback')
        }
      });
    })
}, [])

  return (
    <div className="flex flex-col flex-auto bg-blue-10 h-full p-6 w-full">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-blue-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
          {videocall ? (
        <AgoraUIKit
          rtcProps={props.rtcProps}
          callbacks={props.callbacks} />
      ) : (
        null
      )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCallComponent;

/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import SessionLeft from '../../components/sessionScreen/sessionLeft'
import ChatLayout from '../../components/sessionScreen/ChatLayout'
import { useFetchConversationQuery, useFetchVideoTokenQuery } from '../../redux/features/api/apiSlice'
import VideoCallComponent from '../../components/sessionScreen/VideoCall'
import VideoSessionRight from '../../components/sessionScreen/VideoSessionRight'

function VideoCall({socket}) {
    const location = useLocation();
  const {appointmentId,receiverId} = location.state;
    const [currentChat, setcurrentChat] = useState(null)
    const Convs = useFetchConversationQuery()
    const {data ,isSuccess} = useFetchVideoTokenQuery(appointmentId)
     const Conversations = Convs.data?.conversation
    const activeConversation = Conversations?.filter(conversation => conversation.active === true)[0]
    if (Convs?.isSuccess && isSuccess) {
        return (
            <ChatLayout>
                <SessionLeft setcurrentChat={setcurrentChat} convos={Conversations} active={activeConversation} />
                <VideoCallComponent receiverId={receiverId} videoChannel={appointmentId} videoToken={data?.AgoraToken} socket={socket} currentChat={currentChat}/>
                <VideoSessionRight receiverId={receiverId} appointmentId={appointmentId} currentChat={currentChat} socket={socket}/>
            </ChatLayout >
        )
    }
}

export default VideoCall
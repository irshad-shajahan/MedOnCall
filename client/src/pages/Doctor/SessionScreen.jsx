import React, { useState } from 'react'
// import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import Chat from '../../components/sessionScreen/Chat'
import SessionLeft from '../../components/sessionScreen/sessionLeft'
import ChatLayout from '../../components/sessionScreen/ChatLayout'
import SessionRight from '../../components/sessionScreen/sessionRight'
import { useFetchConversationQuery } from '../../redux/features/api/apiSlice'

function SessionScreen({socket}) {
    const location = useLocation();
  const {appointmentId,receiverId} = location.state;
    const [currentChat, setcurrentChat] = useState(null)
    const Convs = useFetchConversationQuery()
     const Conversations = Convs.data?.conversation
    const activeConversation = Conversations?.filter(conversation => conversation.active === true)[0]
    if (Convs.isSuccess) {
        return (
            <ChatLayout>
                <SessionLeft setcurrentChat={setcurrentChat} convos={Conversations} active={activeConversation} />
                <Chat currentChat={currentChat} socket={socket}/>
                <SessionRight appointmentId={appointmentId} receiverId={receiverId} currentChat={currentChat} socket={socket}/>
            </ChatLayout >
        )
    }
}

export default SessionScreen
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Chat from '../../components/sessionScreen/Chat'
import WentWrong from '../../components/WentWrong'
import SessionLeft from '../../components/sessionScreen/sessionLeft'
import ChatLayout from '../../components/sessionScreen/ChatLayout'
import SessionRight from '../../components/sessionScreen/sessionRight'
import { useFetchConversationQuery } from '../../redux/features/api/apiSlice'
import { hideLoading, showloading } from '../../redux/features/alertSlice'

function SessionScreen({socket}) {
    const location = useLocation();
    const dispatch = useDispatch()
  const {appointmentId,receiverId} = location.state;
    const [currentChat, setcurrentChat] = useState(null)
    const Convs = useFetchConversationQuery()
     const Conversations = Convs.data?.conversation
    const activeConversation = Conversations?.filter(conversation => conversation.active === true)[0]
    if(!Convs.isLoading && !Convs.isSuccess){
        return(<WentWrong/>)
    }
    if(Convs.isLoading){
        dispatch(showloading())
    }else{
        dispatch(hideLoading())
    }
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
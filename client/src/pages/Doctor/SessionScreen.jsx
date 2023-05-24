/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Chat from '../../components/sessionScreen/Chat'
import SessionLeft from '../../components/sessionScreen/sessionLeft'
import ChatLayout from '../../components/sessionScreen/ChatLayout'
import SessionRight from '../../components/sessionScreen/sessionRight'
import { useFetchConversationQuery, useFetchSecondUserQuery } from '../../redux/features/api/apiSlice'

function SessionScreen() {
    const [currentChat, setcurrentChat] = useState(null)
    const Conversation = useFetchConversationQuery()
    // useEffect(() => {
    //     if (Conversation.isSuccess) {
    //         setUser(Conversation?.data.conversation[0].members[1])
    //     }
    // })
    if (Conversation.isSuccess) {
        return (
            <ChatLayout>
                <SessionLeft currentChat={currentChat} setcurrentChat={setcurrentChat} convos={Conversation.data.conversation} />
                <Chat currentChat={currentChat} />
                <SessionRight />
            </ChatLayout >
        )
    }
}

export default SessionScreen
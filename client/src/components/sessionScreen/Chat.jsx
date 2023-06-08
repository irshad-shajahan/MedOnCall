import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFetchMessagesQuery, useSendMessageMutation } from '../../redux/features/api/apiSlice'
import Message from './Message';
import { hideLoading, showloading } from '../../redux/features/alertSlice';

function Chat({ currentChat, socket }) {
    const { data, isSuccess,refetch, isLoading} = useFetchMessagesQuery(currentChat?._id)
    const User = useSelector((state) => state.user.user)
    const [newMessage, setNewMessage] = useState('')
    const [sendMessage, actions] = useSendMessageMutation()
    const dispatch = useDispatch()
    const scrollRef = useRef()

    useEffect(() => {
        socket.current.on('getMessage', () => {
            refetch()
        })
    }, [])

    function getReceiverid() {
        if (currentChat) {
            return currentChat.members?.filter((elem) => elem !== User?._id)[0]
        }
        return false
    }

    async function handleSubmit() {
        const message = {
            Sender: User._id,
            text: newMessage,
            conversationId: currentChat
        }
        socket.current.emit('sendMessage', {
            receiverid: getReceiverid(),
        })

        if(!actions.isLoading){
            await sendMessage(message)
        }
        setNewMessage('')
    }
    
   if(isLoading){
    dispatch(showloading())
   }else{
    dispatch(hideLoading())
   }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [data])

    if (isSuccess) {
        return (
            <div className="flex flex-col flex-auto bg-blue-10 h-full p-6 w-full">
                <div
                    className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-blue-100 h-full p-4"
                >
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                            {data?.messages.map((elem) => (
                                <div className="grid grid-cols-12 gap-y-2" ref={scrollRef}>

                                    <Message message={elem} own={elem.Sender === User._id} />

                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                    >
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                               {currentChat?.active? <input
                                    type="text" onChange={(e) => setNewMessage(e.target.value)}  value={newMessage} onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handleSubmit();
                                        }
                                      }}
                                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                />:
                                 <input
                                    type="text" onChange={(e) => setNewMessage(e.target.value)} disabled value='The session has ended' 
                                    className="flex w-full border rounded-xl focus:outline-none bg-gray-100 text-center text-gray-300 focus:border-indigo-300 pl-4 h-10"
                                />}
                            </div>
                        </div>
                        <div className="ml-4">
                            <button type='button'
                                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                onClick={handleSubmit} >
                                <span>Send</span>
                                <span className="ml-2">
                                    <svg
                                        className="w-4 h-4 transform rotate-45 -mt-px"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                </span>
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
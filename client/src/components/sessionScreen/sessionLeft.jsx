/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ChatList from './chatList';
import { useFetchSecondUserQuery } from '../../redux/features/api/apiSlice';

function SessionLeft({setcurrentChat,convos,active}) {
    const User = useSelector((state)=>state.user.user)
    const secondUserId = active?.members.find((m) => m !== User?._id)
    const activeConvo = useFetchSecondUserQuery(secondUserId)
    const activeSession = activeConvo?.data?.data
    const [secUser,setSecondUSer] = useState(secondUserId)
    const pastSessions = convos.filter(convo=>convo.active===false)
    const pastSessionCount = pastSessions.length
    const fetch = useFetchSecondUserQuery(secUser)
    const secondUser = fetch?.data?.data
    useEffect(()=>{
        setcurrentChat(active)
    })
    return (
        <div className="flex flex-col py-8 pl-6  w-64 bg-blue-100 md:pr-10 flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className='w-32 mr-2 bg-blue-200 rounded-lg mb-4'>
                    <img src="/logo.png" alt="logo" />
                </div>
            </div>
           {secondUser? <div
                className="flex flex-col items-center mt-4 w-full py-6 px-4 rounded-lg"
            >
                <div className="h-20 w-20 rounded-full border overflow-hidden">
                    <img
                        src={secondUser.additionalDetails?secondUser.additionalDetails.profileImage:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"}
                        alt="Avatar"
                        className="h-full w-full"
                    />
                </div>
                <div className="text-lg font-semibold mt-2">{secondUser?.name}</div>
                {/* <div className="text-xs text-gray-500">Lead UI/UX Designer</div> */}
                {/* <div className="flex flex-row items-center mt-3">
                    <div
                        className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
                    >
                        <div className="h-3 w-3 bg-white rounded-full self-end mr-1" />
                    </div>
                    <div className="leading-none ml-1 text-xs">Active</div>
                </div> */}
            </div>:""}
            <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold">Active Session</span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-auto overflow-y-auto">
                    <button type='button'
                        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" onClick={()=>{setcurrentChat(active); setSecondUSer(secondUserId)}}
                    >
                        <div
                            className="flex items-center justify-center h-8 w-8 bg-blue-400 rounded-full"
                        >
                            <img src={activeSession?.additionalDetails?activeSession?.additionalDetails?.profileImage:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"} className='rounded-full' alt="" />
                        </div>
                        <div className="ml-2 text-sm font-semibold">{activeSession?.name}</div>
                    </button>
                </div>
                {/* <div className="flex flex-row items-center justify-between text-xs mt-6">
                    <span className="font-bold">Past Sessions</span>
                    <span
                        className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                    >{pastSessionCount}</span
                    >
                </div>
                {pastSessions.map((elem)=>(
                    <ChatList setSecondUSer={setSecondUSer} setcurrentChat={setcurrentChat} currentUser={User?._id} convo={elem}/>
                ))} */}
            </div>
        </div>
    )
}

export default SessionLeft
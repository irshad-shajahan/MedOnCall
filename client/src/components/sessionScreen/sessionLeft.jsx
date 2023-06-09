/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useFetchSecondUserQuery, useGetUserDetailsQuery } from '../../redux/features/api/apiSlice';
import { hideLoading, showloading } from '../../redux/features/alertSlice';

function SessionLeft({setcurrentChat,active}) {
    const dispatch = useDispatch()
    const {data,isLoading,isSuccess} = useGetUserDetailsQuery()
    const User = data?.data
    const secondUserId = active?.members.find((m) => m !== User?._id)
    const activeConvo = useFetchSecondUserQuery(secondUserId)
    const activeSession = activeConvo?.data?.data
    const [secUser,setSecondUSer] = useState(secondUserId)
    const fetch = useFetchSecondUserQuery(secUser)
    const secondUser = fetch?.data?.data
    useEffect(()=>{
        setcurrentChat(active)
    })
    if(isLoading || activeConvo.isLoading){
        dispatch(showloading())
    }else{
        dispatch(hideLoading())
    }
if(isSuccess){
    return (
        <div className=" flex-col py-8 pl-6  w-64 bg-blue-100 md:pr-10 flex-shrink-0 md:flex hidden">
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
            </div>
        </div>
    )
}
}

export default SessionLeft
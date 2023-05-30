/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useFetchSecondUserQuery } from '../../redux/features/api/apiSlice';

function ChatList({ currentUser, convo, setcurrentChat,setSecondUSer }) {
    const secondUserId = convo?.members.find((m) => m !== currentUser)
    const fetch = useFetchSecondUserQuery(secondUserId)
    const sUser = fetch?.data?.data
    const letterIcon = sUser?.name.slice(0,1).toUpperCase()
    function clickHandler(){
        setcurrentChat(convo)
        setSecondUSer(secondUserId)
    }
    if (fetch.isSuccess) {
        return (
            <div className="flex flex-col space-y-1 mt-4 -mx-2">
                <button type='button' onClick={clickHandler}
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                >
                    <div
                        className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                    >
                        {sUser?.isDoctor ?<img className='rounded-full' src={sUser?.additionalDetails.profileImage} alt="" />:letterIcon}
                    </div>
                    <div className="ml-2 text-sm text-gray-600 font-semibold">{sUser.name}</div>
                </button>
            </div>
        )
    }
}

export default ChatList
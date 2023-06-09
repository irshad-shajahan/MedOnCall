/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import {format} from 'timeago.js'

function Message({ message, own }) {
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {own ? <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                    <div
                        className="flex items-center justify-center h-10 w-10 rounded-full  flex-shrink-0"
                    >
                        <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" alt="" />
                    </div>
                    <div
                        className="relative mr-3 text-sm bg-red-10 py-2 px-4 shadow rounded-xl"
                        >
                        {message.text}
                    </div>
                </div>
                    <div className="float-right" >{format(message.createdAt)}</div>
                        
            </div> : <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                <div
                        className="flex items-center justify-center h-10 w-10 rounded-full  flex-shrink-0"
                    >
                        <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" alt="" />
                    </div>
                    <div
                        className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                        {message.text}
                    </div>
                    
                </div>
                {format(message.createdAt)}
            </div>}
            </>
    )
}

export default Message
import React from 'react'

function ChatLayout({children}) {
  return (
    <div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden">
       {children}
    </div>
</div>
  )
}

export default ChatLayout
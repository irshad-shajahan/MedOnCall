import React from 'react'

function Button({children}) {
  return (
    <button type='button' className='bg-blue-900 text-white font-[poppins] py-2 px-6 rounded md:ml-8 hover:bg-blue-400 duration-500'>
        {children}
    </button>
  )
}

export default Button
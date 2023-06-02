import React from 'react'
import { useGetUserDetailsQuery } from '../../redux/features/api/apiSlice'
import WentWrong from '../WentWrong'

function Dashboard() {
    const {data,isSuccess,isLoading} = useGetUserDetailsQuery()
    const doctor = data?.data
    if(!isSuccess && !isLoading){
        return(
            <WentWrong/>
        )
    }

  return (
    <div className=" p-5">
      <div className="max-w-xl mx-aut">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">

          <div className="bg-blue-100 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Appointments Completed Till Now</h3>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zM9 7a1 1 0 012 0v4a1 1 0 11-2 0V7z"
                  clipRule="evenodd"
                />
              </svg>
              <p className='font-semibold text-xl'>{doctor?.wallet.totalAppointments} Appointments Completed</p>
            </div>
          </div>
          {/* Rest of the dashboard content */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
import React from 'react'
import DocNavbar from '../../components/navbar/docNavbar'
import { useGetUserDetailsQuery } from '../../redux/features/api/apiSlice'
import DocAppointmentsList from '../../components/appointmentList/DocAppointments'

function Appointments() {
    const {data} = useGetUserDetailsQuery()
  return (
    <div>
    <DocNavbar>
     <div className='flex'>
     <div className='flex w-full justify-center m-5'>
        <DocAppointmentsList appointments={data?.data.bookedSlots} />
     </div>
     </div>
    </DocNavbar>
</div>
  )
}

export default Appointments
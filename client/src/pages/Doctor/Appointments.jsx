import React from 'react'
import DocNavbar from '../../components/navbar/docNavbar'
import DocAppointmentsList from '../../components/appointmentList/DocAppointments'
import { useFetchDoctorAppointmentsQuery } from '../../redux/features/api/apiSlice'

function Appointments() {
    // const {data} = useGetUserDetailsQuery()
    const {data} = useFetchDoctorAppointmentsQuery()
    const appointments = data?.appointments.filter(appoint => appoint.completed===false)
  return (
    <div>
    <DocNavbar>
     <div className='flex'>
     <div className='flex w-full justify-center m-5'>
        <DocAppointmentsList appointments={appointments} />
     </div>
     </div>
    </DocNavbar>
</div>
  )
}

export default Appointments
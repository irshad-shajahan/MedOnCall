import React from 'react'
import DocNavbar from '../../components/navbar/docNavbar'
import { useFetchDoctorAppointmentsQuery } from '../../redux/features/api/apiSlice'
import DocAppointmentsHistory from '../../components/appointmentHistory/appointmentHistory'

function AppointmentsHistory() {
    const {data} = useFetchDoctorAppointmentsQuery()
    const appointments = data?.appointments.filter(appointment => appointment.completed===true)
  return (
    <div>
    <DocNavbar>
     <div className='flex'>
     <div className='flex w-full justify-center m-5'>
        <DocAppointmentsHistory appointments={appointments} />
     </div>
     </div>
    </DocNavbar>
</div>
  )
}

export default AppointmentsHistory
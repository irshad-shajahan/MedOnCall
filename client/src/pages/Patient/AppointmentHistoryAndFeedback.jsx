import React from 'react'
import Navbar from '../../components/navbar/navbar'
import SideBar from '../../components/sidebar/Sidebar'
import { usePatientAppointmentsQuery } from '../../redux/features/api/apiSlice'
import WentWrong from '../../components/WentWrong';
import UserAppointmentRecords from '../../components/appointmentHistory/UserAppointmentRecords'

function AppointmentHistory({socket}) {
    const {data,isSuccess,refetch} = usePatientAppointmentsQuery()
    const appointments = data?.updatedAppointments.filter(appointment => appointment.completed===true)
    if(!isSuccess){
      return <WentWrong />
    }
  return (
    <div>
        <Navbar>
         <div className='flex'>
         <SideBar active={2}/>
         <div className='flex w-3/4 justify-center m-5'>
            <UserAppointmentRecords refetch={refetch} socket={socket} appointments={appointments} />
         </div>
         </div>
        </Navbar>
    </div>
  )
}

export default AppointmentHistory
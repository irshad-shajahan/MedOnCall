import React from 'react'
import Navbar from '../../components/navbar/navbar'
import SideBar from '../../components/sidebar/Sidebar'
import AppointmentsList from '../../components/appointmentList/Appointments'
import { usePatientAppointmentsQuery } from '../../redux/features/api/apiSlice'
import WentWrong from '../../components/WentWrong';

function Appointments() {
    const {data,isSuccess} = usePatientAppointmentsQuery()
    if(!isSuccess){
      return <WentWrong />
    }
  return (
    <div>
        <Navbar>
         <div className='flex'>
         <SideBar active={1}/>
         <div className='flex w-3/4 justify-center m-5'>
            <AppointmentsList appointments={data?.updatedAppointments} />
         </div>
         </div>
        </Navbar>
    </div>
  )
}

export default Appointments
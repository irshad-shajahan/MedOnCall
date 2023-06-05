import React from 'react'
import { useDispatch } from 'react-redux'
import Navbar from '../../components/navbar/navbar'
import SideBar from '../../components/sidebar/Sidebar'
import AppointmentsList from '../../components/appointmentList/Appointments'
import { usePatientAppointmentsQuery } from '../../redux/features/api/apiSlice'
import WentWrong from '../../components/WentWrong';
import { hideLoading, showloading } from '../../redux/features/alertSlice'

function Appointments() {
  const dispatch = useDispatch()
  const {data,isSuccess,isLoading} = usePatientAppointmentsQuery()
  if(!isSuccess && !isLoading){
    return <WentWrong />
  }
    if(isLoading){
      dispatch(showloading())
    }else{
      dispatch(hideLoading())
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
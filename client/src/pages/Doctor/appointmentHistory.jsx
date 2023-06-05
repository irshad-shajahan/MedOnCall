import React from 'react'
import { useDispatch } from 'react-redux'
import DocNavbar from '../../components/navbar/docNavbar'
import { useFetchDoctorAppointmentsQuery } from '../../redux/features/api/apiSlice'
import DocAppointmentsHistory from '../../components/appointmentHistory/appointmentHistory'
import WentWrong from '../../components/WentWrong'
import { hideLoading, showloading } from '../../redux/features/alertSlice'

function AppointmentsHistory() {
  const dispatch = useDispatch()
    const {data,isLoading,isSuccess} = useFetchDoctorAppointmentsQuery()
    const appointments = data?.appointments.filter(appointment => appointment.completed===true)
    if (!isSuccess && !isLoading) {
      return <WentWrong />
    }
    if (isLoading) {
      dispatch(showloading())
    } else {
      dispatch(hideLoading())
    }
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
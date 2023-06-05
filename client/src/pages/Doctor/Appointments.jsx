import React from 'react'
import { useDispatch } from 'react-redux'
import DocNavbar from '../../components/navbar/docNavbar'
import DocAppointmentsList from '../../components/appointmentList/DocAppointments'
import { useFetchDoctorAppointmentsQuery } from '../../redux/features/api/apiSlice'
import WentWrong from '../../components/WentWrong'
import { hideLoading, showloading } from '../../redux/features/alertSlice'

function Appointments() {
  const dispatch = useDispatch()
  const { data,isLoading,isSuccess } = useFetchDoctorAppointmentsQuery()
  const appointments = data?.appointments.filter(appoint => appoint.completed === false)
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
            <DocAppointmentsList appointments={appointments} />
          </div>
        </div>
      </DocNavbar>
    </div>
  )
}

export default Appointments
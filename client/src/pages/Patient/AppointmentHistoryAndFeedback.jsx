import React from 'react'
import { useDispatch } from 'react-redux';
import Navbar from '../../components/navbar/navbar'
import SideBar from '../../components/sidebar/Sidebar'
import { usePatientAppointmentsQuery } from '../../redux/features/api/apiSlice'
import WentWrong from '../../components/WentWrong';
import UserAppointmentRecords from '../../components/appointmentHistory/UserAppointmentRecords'
import { hideLoading, showloading } from '../../redux/features/alertSlice';


function AppointmentHistory({ socket }) {
  const dispatch = useDispatch()
  const { data, isSuccess, refetch, isLoading } = usePatientAppointmentsQuery()
  const appointments = data?.updatedAppointments.filter(appointment => appointment.completed === true)
  const sortedAppointments = appointments.slice().sort((a, b) => {
    const aDateTime = new Date(`${a.date} ${a.time}`);
    const bDateTime = new Date(`${b.date} ${b.time}`);
    return bDateTime - aDateTime; // Sort in descending order (recent on top)
  });
  if (!isSuccess && !isLoading) {
    return <WentWrong />
  }
  if (isLoading) {
    dispatch(showloading())
  } else {
    dispatch(hideLoading())
  }

  if (isSuccess) {
    return (
      <div>
        <Navbar>
          <div className='flex'>
            <SideBar active={2} />
            <div className='flex w-3/4 justify-center m-5'>
              <UserAppointmentRecords refetch={refetch} socket={socket} appointments={sortedAppointments} />
            </div>
          </div>
        </Navbar>
      </div>
    )
  }
}




export default AppointmentHistory
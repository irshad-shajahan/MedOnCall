import React from 'react';
import { groupBy } from 'lodash';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { getrequest } from '../../axios/apiCalls';

const DocAppointmentsHistory = ({ appointments }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const groupedAppointments = groupBy(appointments, 'date');
  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => new Date(b) - new Date(a));
  const navigate = useNavigate()
  function addPrescription(appointmentId,receiverid){
    navigate('/doctor/preparePrescription',{state:{appointmentId,receiverid}})
  }
  function prescriptionDownload(id,name) {
    getrequest(`/downloadPrescription/${id}`).then((response) => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `${name} Prescription.pdf`);
      })
      .catch(() => {
      });
}
  return (
    <div className="bg-gray-100 p-4 rounded-lg w-full overflow-y-auto max-h-screen">
      <h2 className="text-lg font-semibold mb-4">Appointment History</h2>
      {sortedDates?.map(date => (
        <div>
          <h2 className="text-lg text-center bg-blue-900 text-white font-bold mb-4 rounded-lg">
            {date === formattedDate ? 'Today' : date}
          </h2>
            {groupedAppointments[date].map(appointment=>(<div
              key={appointment._id}
              className="bg-gray-300 w-full rounded-lg shadow p-4 mb-4 flex justify-between items-center"
            >
              <div className="w-[7%]">
                <img
                  className="rounded-xl"
                  src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                  alt=""
                />
              </div>
              <div className="w-[40%]">
                <h3 className="text-xl font-semibold mb-2">
                  Patient Name: <b className='uppercase text-blue-800'>{appointment.patientName}</b>
                </h3>
                <p className="text-gray-600">
                  Appointment ID: {appointment._id}
                </p>
                <p className="text-yellow-600 font-semibold">
                  Session Duration: 1 Hour
                </p>
              </div>
              <div className="w-[30%]">
                <h5 className="text-red-600 font-semibold text-xl ">
                  Time: {appointment.time}
                </h5>
                <p className="text-gray-600">Date: {appointment.date}</p>
              </div>
              <div className="w-[15%]">
               {appointment.prescriptionDone?<button onClick={()=>prescriptionDownload(appointment._id,appointment.prescription.patientName)}
                  type="button"
                  className="bg-violet-900 rounded-md p-1 font-semibold text-white px-2"
                >
                View Prescription
                </button>:<button
                  type="button" onClick={()=>addPrescription(appointment._id,appointment.userId)}
                  className="bg-yellow-500 rounded-md p-1 font-semibold px-2"
                >
                Add Prescription
                </button>}
              </div>
            </div>))}
        </div>
      ))}
    </div>
  );
};

export default DocAppointmentsHistory;

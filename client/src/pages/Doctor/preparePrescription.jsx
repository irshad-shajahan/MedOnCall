/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DocNavbar from '../../components/navbar/docNavbar'
import { useSubmitPrescriptionMutation } from '../../redux/features/api/apiSlice';

function PreparePrescription({socket}) {
  const navigate = useNavigate()
  const location = useLocation();
  const {appointmentId,receiverid} = location.state;
  console.log('locationstate',location.state);
  console.log(receiverid);
  const [submitPrescription,PrescriptionActions] = useSubmitPrescriptionMutation()
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diagnosedCondition, setDiagnosedCondition] = useState('');
  const [medicines, setMedicines] = useState([{ medicine: '', dosage: '' }]);
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { medicine: '', dosage: '' }]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const prescriptionData={
      patientName,
      age,
      gender,
      diagnosedCondition,
      medicines,
      appointmentId
    }
    // Perform submission logic with the form data
    if(!PrescriptionActions.isLoading){
      submitPrescription(prescriptionData).then((res)=>{
        if(res?.data.success){
          socket.current.emit('prescription-done',{receiverid})
          Swal.fire({
            title: 'Success!',
            text: 'Prescription submitted successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'custom-swal-popup',
              title: 'custom-swal-title',
              content: 'custom-swal-content',
            },
          }).then(()=>{
            navigate('/doctor/appointmentHistory')
          })
        }
      })
    }
    // Reset form fields
    setPatientName('');
    setAge('');
    setGender('');
    setDiagnosedCondition('');
    setMedicines([{ medicine: '', dosage: '' }]);
  };
  return (
    <div>
      <DocNavbar>
        <div className='justify-center flex w-full mt-5'>
          <div className="bg-blue-200 py-4 px-6 rounded-lg max-w-4xl mx-auto">
            <button type='button' onClick={()=>socket.current.emit('prescription-done',{receiverid})}>njekk</button>
            <h1 className="text-2xl text-center font-bold mb-6">Prescription Form</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Patient Name:
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2 mt-1 w-full"
                  />
                </label>
              </div>
             <div className='flex w-full justify-between'>
             <div className="mb-4 w-1/6 flex">
                <label className="block mb-2 text-gray-700">
                  Age:
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2 mt-1 w-full"
                  />
                </label>
              </div>
              <div className="mb-4 w-1/4">
                <label className="block mb-2 text-gray-700">
                  Gender:
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={gender === 'male'}
                    onChange={(e) =>
                      setGender(e.target.checked ? 'male' : '')
                    }
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={gender === 'female'}
                    onChange={(e) =>
                      setGender(e.target.checked ? 'female' : '')
                    }
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </div>
              </div>
             </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Diagnosed Condition:
                  <input
                    type="text"
                    value={diagnosedCondition}
                    onChange={(e) => setDiagnosedCondition(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2 mt-1 w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Medicine & Dosage:</h3>
                {medicines.map((medicine, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex">
                      <label className="block flex-1 mr-4">
                        Medicine:
                        <input
                          type="text"
                          value={medicine.medicine}
                          onChange={(e) =>
                            handleMedicineChange(index, 'medicine', e.target.value)
                          }
                          className="border border-gray-400 rounded-lg px-3 py-2 mt-1 w-full"
                        />
                      </label>
                      <label className="block flex-1">
                        Dosage:
                        <input
                          type="text"
                          value={medicine.dosage}
                          onChange={(e) =>
                            handleMedicineChange(index, 'dosage', e.target.value)
                          }
                          className="border border-gray-400 rounded-lg px-3 py-2 mt-1 w-full"
                        />
                      </label>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(index)}
                          className="flex-none text-red-500 pt-5 text-xl rounded-lg px-3 mt-1 ml-2 hover:text-red-700"
                        >
                          <ion-icon name="trash" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddMedicine}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <span className='mt-2 text-3xl'><ion-icon name="add-circle" /></span>
                  Add Medicine
                </button>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </DocNavbar>
    </div>
  )
}

export default PreparePrescription
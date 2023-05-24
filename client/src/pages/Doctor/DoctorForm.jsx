/* eslint-disable guard-for-in */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unescaped-entities */
import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../../components/navbar/navbar';
import { imageForm } from '../../axios/apiCalls';
import { hideLoading, showloading } from '../../redux/features/alertSlice';
import { isValidRegNumber, isValidText } from '../../components/validations';
import { useGetUserDetailsQuery } from '../../redux/features/api/apiSlice';

function DoctorForm() {
  const navigate = useNavigate();    
  const check =  JSON.parse(localStorage.getItem('check'))
  if(check.isProfileComplete){
    navigate('/doctor')
  }
  let user
  const {data , isSuccess} = useGetUserDetailsQuery()
  if(isSuccess){
      user = data?.data
  }
  const dispatch = useDispatch();
  const [valid, setValid] = useState(false);
 
  const [formData, setFormData] = useState({});
  const [img, setimg] = useState('');
  const [err, setErr] = useState({
    speciality: '',
    regYear: '',
    qualification: '',
    council: '',
    hospital: '',
    regNumber: '',
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !formData.speciality ||
        !formData.qualification ||
        !formData.council ||
        !formData.Fee ||
        !formData.regYear ||
        !formData.regNumber ||
        !img
      ) {
        toast.error('Please fill in the details');
      } else {
        if (!isValidText(formData.speciality)) {
          setErr((prevState) => ({
            ...prevState,
            speciality: 'Enter Valid Speciality',
          }));
          setValid(false);
        } else if (!isValidText(formData.qualification)) {
          setErr((prevState) => ({
            ...prevState,
            qualification: 'Enter Valid Qualification',
          }));
          setValid(false);
        } else if (!isValidText(formData.council)) {
          setErr((prevState) => ({
            ...prevState,
            council: 'Enter Valid Council Name',
          }));
          setValid(false);
        } else if (!isValidText(formData.hospital)) {
          setErr((prevState) => ({
            ...prevState,
            hospital: 'Enter Valid Hospital Name',
          }));
          setValid(false);
        } else if (!isValidRegNumber(formData.regNumber)) {
          setErr((prevState) => ({
            ...prevState,
            regNumber: 'Enter Valid Registration Number',
          }));
          setValid(false);
        } else {
          setErr((prevState) => ({
            ...prevState,
            speciality: '',
            qualification: '',
            council: '',
            hospital: '',
            regNumber: '',
          }));
          setValid(true);
        }

        if (valid) {
          dispatch(showloading());
          const datas = new FormData();
          // eslint-disable-next-line no-restricted-syntax
          for (const key in formData) {
            datas.append(key, formData[key]);
          }
          datas.append('image', img);
          imageForm(`/profilecomplete/${user.phone}`, datas).then((res) => {
            dispatch(hideLoading());
            console.log(res);
            navigate('/pendingVerification');
            check.isProfileComplete = true
            localStorage.setItem("check",JSON.stringify(check))
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch(hideLoading());
    }
  }

  return (
    <div>
      <Navbar>
        <div className="flex flex-col p-4">
          <h4 className="font-semibold">Profile Doctor</h4>
          <hr className="border-t-2 border-gray-300 my-2" />
          {/* <div className='border'/> */}
          <h1 className="text-3xl font-semibold text-blue-900">
            Hello Let's build your profile
          </h1>

          <form action="" className="mt-6" onSubmit={handleSubmit}>
            <div className="flex justify-between mx-16 items-center">
              <div className="flex  flex-col">
                <div className="mt-6">
                  <label className="block font-semibold mb-2 ml-1">
                    Speciality
                  </label>
                  <input
                    name="speciality"
                    className="inline-flex w-80 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border-2"
                    onChange={handleChange}
                  />
                  <span className="block text-red-500 font-semibold">
                    {err.speciality}
                  </span>
                </div>
                <div className="mt-6">
                  <label className="block font-semibold mb-2 ml-1">
                    Educational Qualification
                  </label>
                  <input
                    name="qualification"
                    className="inline-flex w-80 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border-2 "
                    onChange={handleChange}
                  />
                  <span className="block text-red-500 font-semibold">
                    {err.qualification}
                  </span>
                </div>
                <div className="mt-6">
                  <label className="block font-semibold mb-2 ml-1">
                    Registration Council
                  </label>
                  <input
                    name="council"
                    className="inline-flex w-80 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border-2 "
                    onChange={handleChange}
                  />
                  <span className="block text-red-500 font-semibold">
                    {err.council}
                  </span>
                </div>
              </div>
              <div className="flex  flex-col">
                <div className="mt-6">
                  <label className="block font-semibold mb-2 ml-1">
                    Fee Per Consultation
                  </label>
                  <input
                    name="Fee"
                    className="inline-flex w-80 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border-2 "
                    onChange={handleChange}
                  />
                  <span className="block text-red-500 font-semibold">
                    {err.hospital}
                  </span>
                </div>
                <div className="mt-6">
                  <label className="block font-semibold mb-2 ml-1">
                    Medical Registration Number
                  </label>
                  <input
                    name="regNumber"
                    className="inline-flex w-80 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border-2 "
                    onChange={handleChange}
                  />
                  <span className="block text-red-500 font-semibold">
                    {err.regNumber}
                  </span>
                </div>
                <div className="mt-6">
                  <label className="block font-semibold mb-2 ml-1">
                    Registration Year
                  </label>
                  <input
                    name="regYear"
                    className="inline-flex w-80 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border-2 "
                    onChange={handleChange}
                  />
                  <span className="block text-red-500 font-semibold">
                    {err.regYear}
                  </span>
                </div>
              </div>
              <div>
                <div className="mt-6 flex flex-col">
                  <label className="block font-semibold mb-2 ml-1">
                    Upload Profile picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setimg(e.target.files[0]);
                    }}
                    name="profileImage"
                    className="inline-flex w-80 px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <span className="block text-red-500 font-semibold">
                    {err.img}
                  </span>
                  <button
                    className="mt-3 rounded bg-blue-900 text-white font-bold py-2 w-1/6 fixed md:bottom-32"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Navbar>
    </div>
  );
}

export default DoctorForm;

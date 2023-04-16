/* eslint-disable no-underscore-dangle */
// import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import NavBar from '../components/navbar/NavBar';
import { getdata, postForm } from '../axios/apicall';

function DoctorDetails() {
  const [details, setDetails] = useState({});
  const [verifystatus, setVerify] = useState(false);
  const location = useLocation();
  const docId = location.state;
  const getDoctorDetails = async () => {
    try {
      await getdata(`/getdoctordetails/${docId}`).then(async (res) => {
        if (res.data.success) {
          setDetails(res.data.doctor);
          setVerify(res.data.doctor.isVerified);
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
  async function verify() {
    const data = {
      doctorId: details?._id,
      status: verifystatus,
    };
    await postForm(`/doctorverify`, data).then((res) => {
      if (res.data.success) {
        setVerify(res.data.response);
      }
    });
  }

  useEffect(() => {
    try {
      getDoctorDetails();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [verifystatus]);
  console.log(details);
  return (
    <div>
      <Header />
      <div className="w-full min-h-[90vh] grid grid-cols-12">
        <NavBar />
        <div className="grid grid-cols-1  w-full col-span-10">
          <div className="flex justify-start items-center md:pl-10">
            <img
              src={details?.additionalDetails?.profileImage}
              className="w-48 h-56 rounded-3xl bg-blue-200"
              alt="display_image"
            />
            <div className="px-16 w-full">
              {details.isVerified ? (
                <button
                  type="button"
                  onClick={() => verify(false)}
                  className="bg-green-300 px-4 py-1 onclick font-bold text-white w-28 rounded-md float-right"
                >
                  Verified
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => verify(true)}
                  className="bg-red-400 w-28 py-1 font-bold text-white rounded-md float-right"
                >
                  Verify
                </button>
              )}

              <table className=" min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider w-1/3">
                      {' '}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider w-1/3">
                      {' '}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider w-1/3">
                      {' '}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-900 font-bold text-base">
                      Name
                    </td>
                    <td className="font-bold text-xl">:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold">
                      {details?.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-900 font-bold text-base">
                      Phone
                    </td>
                    <td className="font-bold text-xl">:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold">
                      {details?.phone}{' '}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-900 font-bold text-base">
                      Specialization
                    </td>
                    <td className="font-bold text-xl">:</td>
                    <td className="px-6 py-4 whitespace-nowrap ttext-base font-semibold">
                      {details?.additionalDetails?.speciality}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-900 font-bold text-base">
                      Qualification
                    </td>
                    <td className="font-bold text-xl">:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold">
                      {details?.additionalDetails?.qualification}{' '}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-900 font-bold text-base">
                      Medical Council
                    </td>
                    <td className="font-bold text-xl">:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold">
                      {details?.additionalDetails?.council}{' '}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-900 font-bold text-base">
                      Previous Hospital
                    </td>
                    <td className="font-bold text-xl">:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold">
                      {details?.additionalDetails?.hospital}{' '}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-900 font-bold text-base">
                      Registration Number
                    </td>
                    <td className="font-bold text-xl">:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold">
                      {details?.additionalDetails?.regNumber}{' '}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-900 font-bold text-base">
                      Registration Year
                    </td>
                    <td className="font-bold text-xl">:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold">
                      {details?.additionalDetails?.regYear}{' '}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div className="w-full flex flex-col  pl-16">
              <div className="mt-4 text-xl flex">
                <p className="text-blue-700 font-bold">Name:</p>
                <p className="text-gray-900 font-semibold md:pl-24">spc</p>
              </div>
              <div className="mt-4 text-xl flex">
                <p className="text-blue-700 font-bold">Phone:</p>
                <p className="text-gray-900 font-semibold md:pl-24">spc</p>
              </div>
              <div className="mt-4 text-xl flex">
                <p className="text-blue-700 font-bold">Specialization:</p>
                <p className="text-gray-900 font-semibold md:pl-24">spc</p>
              </div>
              <div className="mt-4 text-xl flex">
                <p className="text-blue-700 font-bold">Qualification:</p>
                <p className="text-gray-900 font-semibold md:pl-24">spc</p>
              </div>
              <div className="mt-4 text-xl flex">
                <p className="text-blue-700 font-bold">Medical Council:</p>
                <p className="text-gray-900 font-semibold md:pl-24">spc</p>
              </div>
              <div className="mt-4 text-xl flex">
                <p className="text-blue-700 font-bold">Current/Previous Hospital:</p>
                <p className="text-gray-900 font-semibold md:pl-24">spc</p>
              </div>
              <div className="mt-4 text-xl flex">
                <p className="text-blue-700 font-bold">Registration Number:</p>
                <p className="text-gray-900 font-semibold md:pl-24">spc</p>
              </div>
              <div className="mt-4 text-xl flex">
                <p className="text-blue-700 font-bold">Registration Year:</p>
                <p className="text-gray-900 font-semibold md:pl-24">spc</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;

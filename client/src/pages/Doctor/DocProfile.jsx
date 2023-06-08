/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2';
import React from 'react';
import DocNavbar from '../../components/navbar/docNavbar';
import { useDoctorProfileDataQuery, useWithdrawWalletAmountMutation } from '../../redux/features/api/apiSlice';
import WentWrong from '../../components/WentWrong';

function DocProfile() {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const { data, isSuccess, isLoading } = useDoctorProfileDataQuery()
  const doctor = data?.doctor
  const [withdraw, withdrawActions] = useWithdrawWalletAmountMutation()
  const handleWithdraw = () => {
    withdraw()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Withdrawal Successful',
          text: 'The amount has been transferred to your bank account.',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Withdrawal Failed',
          text: 'An error occurred while processing your withdrawal.',
        });
      });

  };
  if (!isSuccess && !isLoading) {
    return <WentWrong />
  }

  return (
    <div>
    <DocNavbar>
      <div className="container mx-auto mt-8">
        <div className="max-w-full bg-white shadow-lg p-8 rounded-md">
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={doctor?.additionalDetails.profileImage}
              alt="Profile"
            />
            <div>
              <h2 className="text-2xl font-semibold">Hi, {doctor?.name}</h2>
              <p className="text-gray-600">{doctor?.additionalDetails.speciality}</p>
              <p className="text-gray-600">Phone: {doctor?.phone}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-semibold mb-2">Total Appointments</h3>
              <p className="text-2xl">{doctor?.wallet.totalAppointments}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-semibold mb-2">Pending Amount</h3>
              <p className="text-2xl">₹ {doctor?.wallet.DueAmount} /-</p>
              <p className="text-sm font-extralight">(due {month})</p>
            </div>
            <div className="bg-green-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-semibold mb-2">Wallet Balance</h3>
              <p className="text-2xl">₹ {doctor?.wallet.CurrentBalance} /-</p>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-md flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Withdraw Amount</h3>
              {doctor?.wallet.CurrentBalance === 0 ? (
                <button
                  type="button"
                  className="bg-gray-300 cursor-not-allowed text-gray-500 py-2 px-4 rounded-md mt-4"
                  disabled
                >
                  Withdraw
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-white text-blue-500 py-2 px-4 rounded-md mt-4"
                  onClick={handleWithdraw}
                >
                  Withdraw
                </button>
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className='font-semibold text-xl'>Total Money Earned: ₹ <span className='text-blue-600'>{doctor?.wallet.amountWithdrawn} /-</span></p>
          </div>
        </div>
      </div>
    </DocNavbar>
  </div>
  
  );
}

export default DocProfile;

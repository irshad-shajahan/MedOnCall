import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { docGet } from '../../axios/apiCalls';
import { useDocCheckQuery } from '../../redux/features/api/apiSlice';

function DutyAlert() {
  const { data } = useDocCheckQuery();
  const doctor = data?.doc;
  const [dismissed, setDismissed] = useState(false);
  function dismissAlert() {
    setDismissed(true);
  }

  function dutyOn() {
    docGet('/dutyon').then(() => {
      toast.success('You are now online');
      dismissAlert();
    });
  }
  useEffect(() => {
    if (doctor?.isDuty) {
      setDismissed(true);
    } else {
      setDismissed(false);
    }
  }, []);
  return (
    <div
      id="targetElement"
      className={`p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800  ${
        dismissed ? 'hidden transition duration-1000 ease-in-out' : ''
      }`}
      role="alert"
    >
      <div className="flex items-center">
        <svg
          aria-hidden="true"
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">You are offline</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">
        I kindly request that you activate the appointment booking feature to
        facilitate patient scheduling, as it is a crucial aspect of ensuring a
        seamless and efficient healthcare service delivery. By enabling this
        feature, patients will be able to easily schedule their appointments and
        avoid any unnecessary delays or inconveniences. Thank you for your
        attention to this matter.
      </div>
      <div className="flex">
        <button
          type="button"
          className="text-white bg-red-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center "
          onClick={dutyOn}
        >
          Turn On
        </button>
        {/* <button type='button' className='bg-green-500 rounded-lg border-white '>Turn On</button> */}
        <button
          type="button"
          className="text-green-800 bg-transparent border border-green-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
          data-dismiss-target="#alert-additional-content-4"
          aria-label="Close"
          onClick={dismissAlert}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default DutyAlert;

import React from 'react';
import {
  ChipIcon,
} from '@heroicons/react/outline';

function header() {
  return (
    <div className="bg-blue-900 w-ful py-2 items-center justify-between flex px-12 text-white">
      <div className="w-full lg:flex hidden space-x-4 items-center justify-start py-2"/>
      <div className="items-center w-full justify-center flex space-x-4">
        <ChipIcon className="w-6 h-6" />
        <h1 className="text-xl text-white-800 font-medium">Med On Call</h1>
      </div>
      <div className="items-center justify-end space-x-6 flex w-full"/>
    </div>
  );
}

export default header;

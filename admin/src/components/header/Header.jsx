import React from 'react';
import {
  BellIcon,
  ChipIcon,
  InboxIcon,
  SearchIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';

function header() {
  return (
    <div className="bg-blue-900 w-ful py-2 items-center justify-between flex px-12 text-white">
      <div className="w-full lg:flex hidden space-x-4 items-center justify-start py-2">
        <SearchIcon className="w-4 h-4" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none"
        />
      </div>
      <div className="items-center w-full justify-center flex space-x-4">
        <ChipIcon className="w-6 h-6" />
        <h1 className="text-xl text-white-800 font-medium">Med On Call</h1>
      </div>
      <div className="items-center justify-end space-x-6 flex w-full">
        <BellIcon className="w-6 h-6 cursor-pointer" />
        <InboxIcon className="w-6 h-6 cursor-pointer" />
        <UserCircleIcon className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
}

export default header;

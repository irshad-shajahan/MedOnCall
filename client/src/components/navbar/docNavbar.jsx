/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { docGet } from '../../axios/apiCalls';
import SideBar from '../doctor/SideBar';

function DocNavbar({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const links = [
    { name: 'Appointments', link: '/doctor/appointments' },
    { name: 'Medicines', link: '/' },
    { name: user?.name.toUpperCase().split(' ')[0], link: '/' },
  ];


  const [showSidebar, setShowSidebar] = useState(false);
  const logout = () => {
    if (user?.isDoctor) {
      if (user?.Duty) {
        docGet('/dutyon');
      }
    }
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col">
        <div className="shadow-md w-full fixed top-0 left-0">
          <div className="md:flex items-center justify-between bg-blue-900">
            <div className="font-bold text-2xl cursor-pointer flex items-center font-[poppins] text-white">
              <span className="text-3xl mr-1 bg-white rounded">
                <img src="/logo.png" alt="" className="h-16" />
              </span>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="text-3xl text-white hover:text-purple-400 duration-500 focus:outline-none"
                onClick={handleSidebarToggle}
              >
                <ion-icon name="menu-outline" />
              </button>
            </div>
            <ul
              className={`md:flex md:items-center mr-8 md:pb-0 pb-12 absolute md:static bg-blue-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                showSidebar ? 'top-20' : '-top-72'
              } md:top-auto`}
            >
              {links.map((link) => (
                <li className="md:ml-8 font-bold md:my-0 my-7 " key={link.name}>
                  <a
                    href={link.link}
                    className="text-white hover:text-purple-400 duration-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <button
                type="button"
                className="text-2xl bg-blue-900 text-white font-[poppins] pt-2 px-3 rounded md:ml-8 hover:bg-blue-400 duration-500"
                onClick={logout}
              >
                <ion-icon name="log-out-outline" />{' '}
              </button>
            </ul>
          </div>
        </div>
        <div className="md:flex mt-16">
          <SideBar showSidebar={showSidebar} handleSidebarToggle={handleSidebarToggle} />
          <div className="md:flex-1 md:ml-[225px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DocNavbar;

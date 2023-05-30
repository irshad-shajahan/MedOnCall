/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { docGet } from '../../axios/apiCalls';

function Navbar({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const links = [
    { name: 'Appointments', link: '/user/appointments' },
    { name: 'Medicines', link: '/' },
    { name: user?.name.toUpperCase().split(' ')[0], link: '/' },
  ];


  const [open, SetOpen] = useState(false);
  const logout = () => {
    if (user?.isDoctor) {
      if (user?.Duty) {
        docGet('/dutyon');
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('check');
    navigate('/login');
  };
  return (
    <div className="h-screen">
      <div className="flex flex-col">
        <div className="shadow-md w-full fixed top-0 left-0">
          <div className=" md:flex items-center justify-between bg-blue-900 ">
            <div className="font-bold text-2xl cursor-pointer flex items-center font-[poppins] text-white">
              <span className="text-3xl mr-1 bg-white rounded" onClick={()=>navigate('/')}>
                <img src="/logo.png" alt="" className="h-16" />
              </span>
            </div>
            <div
              onClick={() => SetOpen(!open)}
              className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
            >
              <ion-icon name={open ? 'close' : 'menu'}> </ion-icon>
            </div>
            <ul
              className={`md:flex md:items-center mr-8 md:pb-0 pb-12 absolute md:static  bg-blue-900  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                open ? 'top-20' : 'top-[-490px]'
              }`}
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
        <div className="mt-16">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

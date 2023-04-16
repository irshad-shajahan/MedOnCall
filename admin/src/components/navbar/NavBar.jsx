/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
// import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChatAltIcon,
  CogIcon,
  LogoutIcon,
  ShoppingCartIcon,
  TemplateIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { changeNav } from '../../redux/features/activeNav';

// import { navLinks } from './utils/NavDB'

const navElements = [
  {
    id: 0,
    title: 'Dashboard',
    icon: <TemplateIcon className="w-6 h-6 cursor-pointer" />,
    route: '/',
  },
  {
    id: 1,
    title: 'Users',
    icon: <UserIcon className="w-6 h-6 cursor-pointer" />,
    route: '/userpanel',
  },
  {
    id: 2,
    title: 'Doctors',
    icon: <ShoppingCartIcon className="w-6 h-6 cursor-pointer" />,
    route: '/doctorpanel',
  },
  {
    id: 3,
    title: 'News',
    icon: <ChatAltIcon className="w-6 h-6 cursor-pointer" />,
    route: '/',
  },
  {
    id: 4,
    title: 'Settings',
    icon: <CogIcon className="w-6 h-6 cursor-pointer" />,
    route: '/',
  },
];

function NavBar() {
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <nav className="col-span-2 border-r border-gray-200 min-h-[90vh] w-[80px] xl:w-[225px] pt-8 px-1 flex flex-col items-start justify-between">
      <div className="space-y-8 w-full ">
        {navElements.slice(0, 4).map((link) => (
          <NavItem link={link} key={link.id} />
        ))}
        <div className="w-full border-t border-gray-200" />
        {navElements.slice(4, 6).map((link) => (
          <NavItem link={link} key={link.id} />
        ))}
        <div
          className="w-full flex items-center justify-start space-x-8 px-5 cursor-pointer
       group"
          onClick={logout}
        >
          <span>
            <LogoutIcon className="w-6 h-6 cursor-pointer" />
          </span>
          <h1 className="text-gray-600 group-hover:text-black xl:flex hidden">
            LogOut
          </h1>
        </div>
      </div>
    </nav>
  );
}
function NavItem({ link }) {
  const activeNav = useSelector((state) => state.activeNav.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function setNav(id) {
    dispatch(
      changeNav({
        actNav: id,
      })
    );
  }
  return (
    <div
      onClick={() => {
        setNav(link.id);
        navigate(link.route);
      }}
      key={link.id}
      className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer
       group hover:border-gray-900 border-l-4  ${
         activeNav === link.id && 'border-gray-900'
       } `}
    >
      <span> {link.icon}</span>
      <h1
        className={`text-gray-600 group-hover:text-black xl:flex hidden ${
          activeNav === link.id && 'text-black '
        }} `}
      >
        {link.title}
      </h1>
    </div>
  );
}

export default NavBar;

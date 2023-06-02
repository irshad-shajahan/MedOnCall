/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useNavigate } from "react-router-dom";

const navElements = [
  {
    id: 0,
    title: 'Dashboard',
    icon:<ion-icon name="apps"/>,
    route: '/',
  },
  {
    id: 1,
    title: 'Profile',
    icon:<ion-icon name="person"/>,
    route: '/doctor/profile',
  },
  {
    id: 2,
    title: 'Availability',
    icon:<ion-icon name="checkmark-done"/>,
    route: '/doctor/availability',
  },
  {
    id: 3,
    title: 'Appointments',
    icon:<ion-icon name="chatbubbles"/>,
    route: '/doctor/appointments',
  },
  {
    id: 3,
    title: 'Appointment History',
    icon:<ion-icon name="clipboard"/>,
    route: '/doctor/appointmentHistory',
  },

];

function SideBar() {
  return (
    <nav className="col-span-2 fixed bg-blue-900  md:block border-r border-gray-200 min-h-[90vh] w-[80px] xl:w-[225px] pt-8 px-1 flex flex-col items-start justify-between" style={{ overflow: 'hidden' }}>
      <div className="space-y-8 w-full ">
        {navElements.slice(0, 4).map((link) => (
          <NavItem link={link} key={link.id} />
        ))}
        <div className="w-full border-t border-gray-200" />
        {navElements.slice(4, 6).map((link) => (
          <NavItem link={link} key={link.id} />
        ))}
      </div>
    </nav>
  );
}
function NavItem({ link }) {
    const navigate = useNavigate()
  const activeNav = 40
  return (
    <div
    onClick={() => {
        navigate(link.route);
      }}
      key={link.id}
      className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer
       group hover:border-gray-900 border-l-4  ${
         activeNav === link.id && 'border-gray-900'
       } `}
    >
      <span className="text-white"> {link.icon}</span>
      <h1
        className={`text-white font-semibold group-hover:text-black xl:flex hidden ${
          activeNav === link.id && 'text-black '
        }} `}
      >
        {link.title}
      </h1>
    </div>
  );
}

export default SideBar;

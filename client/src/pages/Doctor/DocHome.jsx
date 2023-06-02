import React from 'react';
// import DutyAlert from '../../components/doctor/DutyAlert';
import DocNavbar from '../../components/navbar/docNavbar';
import Dashboard from '../../components/doctor/Dashboard';

function DocHome() {

  return (
    <div>
      <DocNavbar>
      {/* <DutyAlert/> */}
      <Dashboard/>
      </DocNavbar>
    </div>
  );
}

export default DocHome;

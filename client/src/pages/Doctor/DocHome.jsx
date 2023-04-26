import React from 'react';
import Navbar from '../../components/navbar/navbar';
import DutyAlert from '../../components/doctor/DutyAlert';

function DocHome() {

  return (
    <div>
      <Navbar>
      <DutyAlert/>
      </Navbar>
    </div>
  );
}

export default DocHome;

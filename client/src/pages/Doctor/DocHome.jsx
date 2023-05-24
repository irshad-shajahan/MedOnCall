import React from 'react';
import DutyAlert from '../../components/doctor/DutyAlert';
import DocNavbar from '../../components/navbar/docNavbar';

function DocHome() {

  return (
    <div>
      <DocNavbar>
      <DutyAlert/>
      </DocNavbar>
    </div>
  );
}

export default DocHome;

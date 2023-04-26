import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Header from '../components/header/Header';
import NavBar from '../components/navbar/NavBar';
import { getdata } from '../axios/apicall';

function UserPanel() {
  const [userData, SetData] = useState([]);

  const columns = [
    { name: 'Name', selector: (row) => row.name },
    {
      name: 'phone',
      selector: (row) => row.phone,
    },
  ];
  const getUserData = async () => {
    try {
      const res = await getdata('/userpanel')
      if (res.data.success) {
        SetData(res.data.users);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      getUserData();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="w-full min-h-[90vh] grid grid-cols-12">
        <NavBar />
        <div className="grid grid-cols-1  w-full col-span-10">
          <DataTable columns={columns} data={userData} />
        </div>
      </div>
    </div>
  );
}

export default UserPanel;

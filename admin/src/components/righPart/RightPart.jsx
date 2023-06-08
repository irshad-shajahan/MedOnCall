import React, { useEffect, useState } from 'react';
import BarChart from '../Charts/BarChart';
import { getdata } from '../../axios/apicall';

function Rightpart() {
  const [popularDoctors, setPopularDoctors] = useState([]);
  const [appntmntRate, setappntmntRate] = useState([]);

  const fetchPopularDoctors = async () => {
    try {
      const response = await getdata('/getPopDoc');
      setPopularDoctors(response?.data.popularDoctors);
    } catch (error) {
      console.error('Error fetching popular doctors:', error);
    }
  };
  const appointmentsRate = async () =>{
    const response = await getdata('/getappntmntRate');
    setappntmntRate(response?.data.popularDoctors)
  }
  useEffect(() => {
    fetchPopularDoctors();
    appointmentsRate()
  }, []);
console.log(appntmntRate);
  return (
    <div>
      <h2 className="text-3xl mb-4 m-6 font-bold">Popular Doctors</h2>
      {popularDoctors.length > 0 ? (
        <BarChart data={popularDoctors} />
      ) : (
        <p>Loading popular doctors...</p>
      )}
    </div>
  );
}

export default Rightpart;

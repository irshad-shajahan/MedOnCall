import React, {  } from 'react';
import '../components/navbar/layoutStyle.css';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Banner from '../components/homepage/banner';
import Analytics from '../components/homepage/analytics';
import NewsLetter from '../components/homepage/newsLetter';

function HomePage() {
  // const Doctor = useSelector(state=>state.user.user)
  // const navigate = useNavigate();
  
// useEffect(()=>{
//   if(Doctor?.isDoctor){
//     if(Doctor.additionalDetails){
//       if(Doctor.verified){
//         alert('the doctor is verified')
//       }
//     }else{
//       navigate('/doctorForm');
//     }
//   }
// },[Doctor,navigate])
  return (
    <div>
      <Navbar>
        <Banner />
        <Analytics/>
        <NewsLetter/>
      </Navbar>
    </div>
  );
}

export default HomePage;

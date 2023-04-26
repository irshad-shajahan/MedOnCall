import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import '../../components/navbar/layoutStyle.css';
import { useDispatch } from 'react-redux';
import Navbar from '../../components/navbar/navbar';
import Banner from '../../components/homepage/banner';
import Analytics from '../../components/homepage/analytics';
import NewsLetter from '../../components/homepage/newsLetter';
import { useDocCheckQuery } from '../../redux/features/api/apiSlice';
import { hideLoading, showloading } from '../../redux/features/alertSlice';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data, isSuccess, isLoading, isFetching,isError} = useDocCheckQuery();

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showloading());
    } else if(isError){
      dispatch(hideLoading())
    }else if (isSuccess) {
      dispatch(hideLoading());
      console.log(data);
      console.log(data?.doc?.isDoctor,'ssssssssssssssssssssss');
      if (data?.doc?.isDoctor) {
        navigate('/doctor');
      }
    }
  }, [isLoading, isFetching, isSuccess, data, dispatch, navigate]);

  return (
    <div>
      <Navbar>
        <Banner />
        <Analytics />
        <NewsLetter />
      </Navbar>
    </div>
  );
}

export default HomePage;

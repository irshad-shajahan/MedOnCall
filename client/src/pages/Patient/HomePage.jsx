import React from 'react';
import '../../components/navbar/layoutStyle.css';
import Navbar from '../../components/navbar/navbar';
import Banner from '../../components/homepage/banner';
import Analytics from '../../components/homepage/analytics';
import NewsLetter from '../../components/homepage/newsLetter';

function HomePage() {
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

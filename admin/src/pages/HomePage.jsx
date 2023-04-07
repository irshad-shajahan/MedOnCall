import React from 'react'
import Header from '../components/header/Header';
import LeftPart from '../components/leftPart/LeftPart';
import RightPart from '../components/righPart/RightPart';
import NavBar from '../components/navbar/NavBar';

function HomePage() {
  return (
    <div>
        <Header />
      <div className="w-full min-h-[90vh] grid grid-cols-12">
        <NavBar />
        <div className="grid grid-cols-1 xl:grid-cols-5 w-full col-span-10">
          <LeftPart />
          <RightPart />
        </div>
    </div>
    </div>
  )
}

export default HomePage
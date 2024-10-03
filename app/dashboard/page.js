// 'use client'
import React from 'react'
// import { useState } from "react";
import TopNav from '../components/TopNav';
// import SideNav from '../components/SideNav';
import Content from '../components/Content';

const page = () => {
  // const [navWidth, setNavWidth] = useState(true);

  return (
    <>
       <TopNav />
      {/* <div className="d-flex"> */}
        {/* <SideNav setNavWidth={setNavWidth} navWidth={navWidth} /> */}
        <Content
          // navWidth={navWidth}
        />
      {/* </div> */}
    </>)
}

export default page
'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import Content from "./components/Content";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import { useState } from "react";

export default function Home() {
  const [navWidth, setNavWidth] = useState(true);

  return (
    <>
      <TopNav />
      <div className="d-flex">
        <SideNav setNavWidth={setNavWidth} navWidth={navWidth} />
        <Content navWidth={navWidth} />
      </div>
    </>
  );
}

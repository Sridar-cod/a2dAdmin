import "bootstrap/dist/css/bootstrap.min.css";
import Content from "./components/Content";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";

export default function Home() {
  return (
    <>
      <TopNav />
      <div className="d-flex">
        <SideNav />
        <Content />
      </div>
    </>
  );
}

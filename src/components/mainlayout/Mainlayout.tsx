import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import "./mainlayout.css";
const Mainlayout = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="AppGlass">
       <div className="side_parent">
       <Sidebar />
       </div>

       <div className="main_parent p-lg-1 w-100">
       <Outlet />
       </div>
      </div>
    </>
  );
};

export default Mainlayout;

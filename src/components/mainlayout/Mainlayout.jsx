import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import "./mainlayout.css";
const Mainlayout = () => {
  return (
    <>
      <div className="AppGlass">
        <Sidebar />

        <Outlet />
      </div>
    </>
  );
};

export default Mainlayout;

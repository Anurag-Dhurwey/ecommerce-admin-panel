import "./Sidebar.css";
// import logo from "../../image/Tranparent_logo_dark.png";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { catlog, blog } from "../../utils/Constants";
import { FaClipboardList, FaRegQuestionCircle } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState<string | number>("dashboard");
  return (
    <div className="Sidebar ">
     
      <Link
        onClick={() => {
          setActive("dashboard");
        }}
        to=""
        className="menu  "
      >
        <div
          className={active === "dashboard" ? "menuItem active" : "menuItem"}
        >
          <AiOutlineDashboard className="fs-4" />
          <span>Dashboard</span>
        </div>
      </Link>

      {/* customer */}
      <Link
        onClick={() => {
          setActive("customers");
        }}
        to="customers"
        className="menu "
      >
        <div
          className={active === "customers" ? "menuItem active" : "menuItem"}
        >
          <AiOutlineUser className="fs-4" />
          <span>Customers</span>
        </div>
      </Link>

      {/* catlog */}

      {catlog.map((item, index) => {
        const { icon: Icon } = item;
        return (
          <Link
            key={index}
            onClick={() => {
              setActive(index);
            }}
            to={item.path}
            className="menu "
          >
            <div className={active === index ? "menuItem active" : "menuItem"}>
              <Icon />
              <span>{item.name}</span>
            </div>
          </Link>
        );
      })}

      {/* blog */}

      {/* {blog.map((item, index) => {
        return (
          <Link
            key={index}
            onClick={() => {
              setActive(index);
            }}
            to={item.path}
            className="menu"
          >
            <div className={active === index ? "menuItem active" : "menuItem"}>
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
        );
      })} */}

      {/* orders */}

      <Link
        onClick={() => {
          setActive("orders");
        }}
        to="orders"
        className="menu"
      >
        <div className={active === "orders" ? "menuItem active" : "menuItem"}>
          <FaClipboardList className="fs-4" />
          <span>Orders</span>
        </div>
      </Link>

      {/* enquiries */}
      <Link
        onClick={() => {
          setActive("enquiries");
        }}
        to="enquiries"
        className="menu  "
      >
        <div
          className={active === "enquiries" ? "menuItem active" : "menuItem"}
        >
          <FaRegQuestionCircle className="fs-4" />
          <span>Enquiries</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;

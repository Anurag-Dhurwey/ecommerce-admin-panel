import { IoIosNotifications } from "react-icons/io";
import { useState } from "react";
// import {
//   AiOutlineDashboard,
//   AiOutlineShoppingCart,
//   AiOutlineUser,
//   AiOutlineBgColors,
//   AiOutlinePicLeft,
//   AiOutlinePicRight,
// } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import "./header.css";
const Header = () => {
  //   const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      {/* header left side */}
      <Stack
        direction="row"
        alignItems="center"
        p={1}
        pt={0}
        sx={{
          position: "sticky",

          top: 0,
          justifyContent: "space-between",
        }}
      >
        {/* <div className="logo">
          <h2 c">
            <span className="sm-logo"> RA</span>
            className="text-white fs-4 text-center py-3 mb-0"
          </h2>
        </div> */}
        {/* <button
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            backgroundColor: "#transparent",

            border: "none",
            outline: "none",
            color: "#fff",
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <AiOutlinePicRight className="fs-4" />
          ) : (
            <AiOutlinePicLeft className="fs-4" />
          )}
        </button> */}
        <Link
          to="/"
          className="fs-4 text-center py-3 mb-0"
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span> Rai </span>
        </Link>

        {/* header right side */}
        <div className="d-flex gap-4 align-items-center px-3 ">
          <div className="position-relative ">
            <IoIosNotifications className="fs-4 " color="black" />
            <span className="badge bg-warning rounded-circle p-1 position-absolute ">
              3
            </span>
          </div>
          <div className="d-flex gap-3 mx-2 align-items-center dropdown">
            <div>
              <img
                height={32}
                width={32}
                src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                alt=""
              />
            </div>
            <div
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mb-0 text-black">Vishal</h5>
              <p className="mb-0 text-black ">vishalpatel@gmail.com</p>
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link
                  className="dropdown-item py-2 mb-0  "
                  style={{ height: "auto", lineHeight: "20px" }}
                  to=""
                >
                  View Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item py-1 mb-0"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to=""
                >
                  Sigout
                </Link>
              </li>
            </div>
          </div>
        </div>
      </Stack>
    </>
  );
};

export default Header;

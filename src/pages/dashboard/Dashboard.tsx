import React from "react";
import Cards from "../../components/Cards/Cards";
import "./dashboard.css";
import Table from "../../components/Table/Table";
import Orders from "../orders/Orders";
// import { Flex } from "antd";

const Dashboard = () => {
  return (
    <div
      style={{
        marginTop: "1rem",
      }}
      className="MainDash"
    >
      <h2 className="">Dashboard</h2>
      <div className="Table">
        <h3 className="pb-4">Recent Orders</h3>
        <Orders title="" />
      </div>
    </div>
  );
};

export default Dashboard;

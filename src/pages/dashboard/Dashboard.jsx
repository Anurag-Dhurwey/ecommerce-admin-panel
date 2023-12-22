import "./dashboard.css";
import {
  BsArrowDownRight,
  BsArrowDownLeft,
  BsArrowUpRight,
  BsArrowUpLeft,
} from "react-icons/bs";

import { Column } from "@ant-design/plots";
import { Table } from "antd";

// data for table orders list
const columns = [
  {
    title: "Sr No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

// data for table orders list end here

const Dashboard = () => {
  // data for chart income statics
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "Jul",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",

    label: {
      position: "top",

      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Months",
      },
      sales: {
        alias: "Income",
      },
    },
    colorField: "#ffd333",
  };
  // data for chart income statics end here
  return (
    <div>
      <h3 className="mt-4">Dashboard</h3>
      {/* dash board secondary header where we can show some stats */}
      <div className="d-flex justify-content-between align-items-center gap-3">
        {/* firse div for showing stats */}
        <div className="d-flex  justify-content-between align-items-end  flex-grow-1  rounded-3 ">
          <div>
            {" "}
            <p>Total</p> <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column  align-items-end    ">
            {" "}
            <h6>
              <BsArrowDownRight />
              32%
            </h6>
            <p className=" mb-0"> Compare To April 2023</p>
          </div>
        </div>

        {/* second div for showing stats */}
        <div className="d-flex  justify-content-between align-items-end  flex-grow-1  rounded-3 ">
          <div>
            {" "}
            <p>Total</p> <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column  align-items-end ">
            {" "}
            <h6 className="red">
              <BsArrowDownRight />
              32%
            </h6>
            <p className=" mb-0"> Compare To April 2023</p>
          </div>
        </div>

        {/* third div for showing stats */}
        <div className="d-flex  justify-content-between align-items-end flex-grow-1  rounded-3 ">
          <div>
            {" "}
            <p>Total</p> <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column  align-items-end ">
            {" "}
            <h6 className="green">
              <BsArrowDownRight />
              32%
            </h6>
            <p className=" mb-0"> Compare To April 2023</p>
          </div>
        </div>
      </div>
      {/* dash board secondary header where we  can show some stats end here */}

      {/* chart section for showing income statics */}
      <div className="mt-4">
        <h3 className="mb-4">Income Statics</h3>
        <Column {...config} />
      </div>
      {/* chart section for showing income statics end here */}

      {/* table for showing recent orders */}
      <div className="mt-4">
        <h3 className="mb-4">
          Recent Orders <BsArrowUpRight className="green fs-4 " />
        </h3>
        <div>
          <Table
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={data1}
          />
        </div>
      </div>
      {/* table for showing recent orders end here */}

      {/* <div className="mt-4">
        <h3 className="mb-4">Recent Reviews</h3>
        <div className="d-flex  ">
          <div></div>
          <div></div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;

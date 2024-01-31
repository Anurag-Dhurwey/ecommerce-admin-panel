import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/customers/customerSlice";
import { Table } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
const columns = [
  {
    title: "Sr No",
    dataIndex: "key",
  },
  {
    title: "Firstname",
    dataIndex: "Firstname",
    // sorter: (a, b) => a.Firstname.localeCompare(b.Firstname),
    // defaultSortOrder: "descend",
    // sortDirections: ["descend", "ascend"],
  },
  {
    title: "Lastname",
    dataIndex: "Lastname",
  },
  {
    title: "email",
    dataIndex: "email",
  },
  {
    title: "mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  // feth data from api
  const { customers, isSuccess } = useAppSelector((state) => state.customers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isSuccess) dispatch(getUsers());
  }, [isSuccess, dispatch]);

  interface data {
    key: number;
    Firstname: string;
    Lastname: string;
    email: string;
    mobile: string;
  }
  // putting data in table
  const data1: data[] = [];
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].role !== "admin")
      data1.push({
        key: i + 1,
        Firstname: customers[i].firstname,
        Lastname: customers[i].lastname,
        email: customers[i].email,
        mobile: customers[i].mobile,
      });
  }

  return (
    <div
      style={{
        overflow: "scroll",
        marginTop: "1rem",
      }}
    >
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={data1}
        />
      </div>
    </div>
  );
};

export default Customers;

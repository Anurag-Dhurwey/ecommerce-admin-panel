import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/customers/customerSlice";
import { Table } from "antd";
import { useEffect } from "react";
const columns = [
  {
    title: "Sr No",
    dataIndex: "key",
  },
  {
    title: "Firstname",
    dataIndex: "Firstname",
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // get data from state
  const customersState = useSelector((state) => state.customers.customers);
  console.log(customersState);

  // putting data in table
  const data1 = [];
  for (let i = 0; i < customersState.length; i++) {
    if (customersState[i].role !== "admin")
      data1.push({
        key: i + 1,
        Firstname: customersState[i].firstname,
        Lastname: customersState[i].firstname,
        email: customersState[i].email,
        mobile: customersState[i].mobile,
      });
  }

  return (
    <div
      style={{
        overflow:"scroll",
        marginTop: "1rem",
      }}
    >
      <h3 className="mb-4 title">Customers</h3>
      <div>
        {" "}
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

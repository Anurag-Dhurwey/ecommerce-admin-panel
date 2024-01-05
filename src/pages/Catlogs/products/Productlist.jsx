import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getproduts } from "../../../features/product/productSlice";
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
const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproduts());
  }),
    [];
  const productstate = useSelector((state) => state.product);
  return (
    <div
      style={{
        overflow: "scroll",
        marginTop: "1rem",
      }}
    >
      <h3 className="mb-4 title">Products</h3>
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

export default Productlist;

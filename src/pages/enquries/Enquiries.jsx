import { Table } from "antd";
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
const Enquiries = () => {
  return (
    <div
    style={{
      overflow:"scroll",
      marginTop: "1rem",
    }}
    >
      <h3 className="mb-4 title">Enquiries</h3>
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

export default Enquiries;

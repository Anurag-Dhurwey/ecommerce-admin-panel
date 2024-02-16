import { Table } from "antd";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getEnquiry } from "../../features/enquiry/enquirySlice";
import { enquiry, user } from "../../utils/types";
const columns = [
  {
    title: "Sr No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

interface data {
  key: number;
  title: string;
  description: string;
  status: "Submitted" | "Contacted" | "In Progress" | "Resolved";
  user?:string|user
}



const Enquiries = () => {
  const { enquiry, isSuccess } = useAppSelector((state) => state.enquiry);
const dispatch=useAppDispatch()
const data1:data[] = []

useEffect(()=>{
enquiry?.forEach((enq,i)=>{
  for (let i = 0; i < enquiry.length; i++) {
    data1.push({
      key: i,
      title: enquiry[i].title,
      description: enquiry[i].deacription,
      status: enquiry[i].status,
    });
  }
})
},[enquiry])

  useEffect(() => {
    function fetchEnquiry() {
      dispatch(getEnquiry())
    }
    !isSuccess && !enquiry.length && fetchEnquiry();
  }, []);
  return (
    <div
      style={{
        overflow: "scroll",
        marginTop: "1rem",
      }}
    >
      <h3 className="mb-4 title">Enquiries</h3>
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

export default Enquiries;

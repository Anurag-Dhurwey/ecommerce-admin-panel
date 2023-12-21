const Dashboard = () => {
  return (
    <div>
      <h3 className="mt-4">Dashboard</h3>
      {/* dash board secondary header where we
      can show some stats */}
      <div className="d-flex justify-content-between align-items-center gap-3">
        {/* firse div for showing stats */}
        <div className="d-flex  justify-content-between align-items-end  flex-grow-1  rounded-3 ">
          <div>
            {" "}
            <p>Total</p> <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column  align-items-end    ">
            {" "}
            <h6>32%</h6>
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
            <h6>32%</h6>
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
            <h6>32%</h6>
            <p className=" mb-0"> Compare To April 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

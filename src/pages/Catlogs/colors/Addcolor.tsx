import CustomInput from "../../../components/custominput/CustomInput";

const Addcolor = () => {
  return (
    <div
      style={{
        marginTop: "5rem",
      }}
    >
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="">
          <CustomInput type="color" label="Enter Color" />
          <button
            className="btn btn-success border-0  rounded-3 my-4"
            type="submit"
          >
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;

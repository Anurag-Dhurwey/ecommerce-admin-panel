import CustomInput from "../../../components/custominput/CustomInput";

const AddBrand = () => {
  return (
    <div
      style={{
        marginTop: "5rem",
      }}
    >
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Blog Category" />
          <button
            className="btn btn-success border-0  rounded-3 my-4"
            type="submit"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;

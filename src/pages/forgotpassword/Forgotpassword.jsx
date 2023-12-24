import CustomInput from "../../components/custominput/CustomInput";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />

      <div className="my-5 w-25  bg-white  rounded-3  mx-auto p-3 ">
        <h3 className=" text-center title"> Forgot password </h3>
        <p className=" text-center ">
          Please enter your register email to get reset password link.{" "}
        </p>
        <form>
          <CustomInput type="email" label="Email Address" i_id="email" />

          <botton
            className=" fs-5  border-0  px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            {" "}
            Send Reset Link
          </botton>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;

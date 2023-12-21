import CustomInput from "../../components/custominput/CustomInput";
import { Link } from "react-router-dom";

const Resetpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />

      <div className="my-5 w-25  bg-white  rounded-3  mx-auto p-3 ">
        <h3 className=" text-center "> Reset Password </h3>
        <p className=" text-center ">Please enter your new password </p>
        <form>
          <CustomInput type="password" label="New Password" i_id="pass" />
          <CustomInput
            type="password"
            label="Confirm Password"
            i_id="confirmemail"
          />

          <botton
            className=" fs-5  border-0  px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            {" "}
            Reset Password
          </botton>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;

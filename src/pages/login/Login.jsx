import CustomInput from "../../components/custominput/CustomInput";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />

      <div className="my-5 w-25  bg-white  rounded-3  mx-auto p-5 ">
        <h3 className=" text-center title ">Login</h3>
        <p className=" text-center ">Login to your account to continue.</p>
        <form>
          <CustomInput type="email" label="Email Address" i_id="email" />
          <CustomInput type="password" label="password" i_id="pass" />
          <div className="mb-3 text-end ">
            <Link to="/forgot-password" className="text-decoration-none ">
              Forgot Password? <br />
            </Link>
          </div>
          <Link
            to="/admin"
            className=" fs-5  border-0  px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            {" "}
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

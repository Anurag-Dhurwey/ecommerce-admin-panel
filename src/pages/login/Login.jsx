import CustomInput from "../../components/custominput/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

import "./login.css";
import { useEffect } from "react";
const Login = () => {
  const authState = useSelector((state) => state);
  const { isError, isSuccess, isLoading, user, message } = authState.auth;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      // navigate("/admin");

      // alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    if (user || isSuccess || sessionStorage.getItem('token')) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [user, isSuccess, isError, isLoading,navigate]);

  return (
    <div className="py-5" style={{ minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />

      <div className="upperdiv my-5 w-25  bg-white  rounded-3  mx-auto  ">
        <h3 className=" text-center title ">Login</h3>
        <p className=" text-center ">Login to your account to continue.</p>
        {message && (
          <div className="error text-danger  text-center "><p>{message}</p></div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            name="email"
            label="Email Address"
            i_id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger ">{formik.errors.email}</div>
            ) : null}
          </div>

          <CustomInput
            type="password"
            name="password"
            label="password"
            i_id="pass"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mb-3 text-end ">
            <Link to="/forgot-password" className="text-decoration-none ">
              Forgot Password? <br />
            </Link>
          </div>
          <button
            className=" fs-5  border-0  px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            {" "}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

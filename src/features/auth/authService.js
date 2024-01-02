import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const login = async (userdata) => {
  const response = await axios.post(`${base_url}user/admin-login`, userdata);
  if (response.data) {
    // localStorage.setItem("user", JSON.stringify(response.data));
    sessionStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const authService = {
  login,
};

export default authService;

import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const login = async (userdata) => {
  try {
    const response = await axios.post(`${base_url}user/admin-login`, userdata);
    if (response.data.token) {
      // localStorage.setItem("user", JSON.stringify(response.data));
      sessionStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error(`${error.response.data.message}`);
  }
};

const authService = {
  login,
};

export default authService;

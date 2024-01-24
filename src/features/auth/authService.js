import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const login = async (userdata) => {
  try {
    const response = await axios.post(`${base_url}user/admin-login`, userdata);
    if (response.data.token) {
      sessionStorage.setItem("token", response.data.token);
    }
    console.log({response})
    return response.data;
  } catch (error) {
    console.log({error})
    throw new Error(`${error.response.data.message}`);
  }
};

const authService = {
  login,
};

export default authService;

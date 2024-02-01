import axios from "axios";
import { api, base_url } from "../../utils/axiosConfig";

export interface userRes {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  token: string;
}

export interface loginBody{
  email: string;
  password: string;
}
const login = async (userdata:loginBody ): Promise<userRes> => {
  try {
    const response = await axios.post(`${base_url}${api.user.loginAdmin}`, userdata);
    if (response.data.token) {
      sessionStorage.setItem("token", response.data.token);
    }else{
      throw new Error(`${'token not found'}`);
    }
    return response.data as userRes;
  } catch (error: any) {
    throw new Error(`${error.response.data.message}`);
  }
};

const authService = {
  login,
};

export default authService;

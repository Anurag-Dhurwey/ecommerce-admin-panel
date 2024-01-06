import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);
  // console.log(response.data,"cos");

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;

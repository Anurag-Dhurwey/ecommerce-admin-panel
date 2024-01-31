import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
import { user } from "../../utils/types";

const getUsers = async ():Promise<user[]> => {
  const response = await axios.get(`${base_url}user/all-users`);
  return response.data as user[];
};

const customerService = {
  getUsers,
};

export default customerService;

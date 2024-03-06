import axios from "axios";
import { api, base_url, config } from "../../utils/axiosConfig";
import { user } from "../../utils/types";

const getUsers = async ():Promise<user[]> => {
  const response = await axios.get(`${api.user.getAll()}`,config);
  return response.data as user[];
};

const customerService = {
  getUsers,
};

export default customerService;

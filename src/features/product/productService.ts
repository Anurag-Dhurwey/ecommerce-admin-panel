import axios from "axios";
import { api, base_url } from "../../utils/axiosConfig";
import { product } from "../../utils/types";

const getProducts = async (): Promise<product[]> => {
  try {
    const response = await axios.get(`${base_url}${api.product.getAll}?as_draft=false`);
    return response.data as product[];
  } catch (error: any) {
    throw new Error(`${error.response.data.message}`);
  }
};


const getDraftProducts = async ():Promise<product[]> => {
  try {
    const response = await axios.get(`${base_url}${api.product.getAll}?as_draft=true`);
    return response.data as product[];
  } catch (error:any) {
    throw new Error(`${error.response.data.message}`);
  }
};

const draftService = {
  getProducts,getDraftProducts
};

export default draftService;

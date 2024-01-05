import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getDraftProducts = async () => {
  try {
    const response = await axios.get(`${base_url}product/draft/products`);
    // console.log(response.data);
    //   http://localhost:5000/api/
    return response.data;
  } catch (error) {
    throw new Error(`${error.response.data.message}`);
  }
};

const productService = {
  getDraftProducts,
};

export default productService;

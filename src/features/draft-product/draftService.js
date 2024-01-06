
import axios from "axios";
import { base_url } from "../../utils/axiosConfig";


const getDraftProducts = async () => {
    try {
      const response = await axios.get(`${base_url}product/draft/products`);
      return response.data;
    } catch (error) {
      throw new Error(`${error.response.data.message}`);
    }
  };


  const DraftProducts={getDraftProducts}


  export default DraftProducts
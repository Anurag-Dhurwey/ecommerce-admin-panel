
import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
import { product } from "../../utils/types";


const getDraftProducts = async ():Promise<product[]> => {
    try {
      const response = await axios.get(`${base_url}product?as_draft=true`);
      return response.data as product[];
    } catch (error:any) {
      throw new Error(`${error.response.data.message}`);
    }
  };


  const DraftProducts={getDraftProducts}


  export default DraftProducts
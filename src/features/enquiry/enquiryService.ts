import axios from "axios";
import { api, base_url, config } from "../../utils/axiosConfig";
import { enquiry, order } from "../../utils/types";

const getEnquiry = async ():Promise<enquiry[]> => {
 try {
    const response = await axios.get(`${base_url}${api.enquiry.getAll}`,config);
    return response.data as enquiry[];
 } catch (error:any) {
    throw new Error(error.message)
 }
};

const EnquiryService = {
   getEnquiry,
};

export default EnquiryService;

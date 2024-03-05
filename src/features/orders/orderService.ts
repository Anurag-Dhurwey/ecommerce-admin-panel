import axios from "axios";
import { api, base_url, config } from "../../utils/axiosConfig";
import { order } from "../../utils/types";

const getOrders = async ():Promise<order[]> => {
 try {
    const response = await axios.get(`${api.user.order.getAll()}`,config);
    console.log({response})
    return response.data as order[];
 } catch (error:any) {
    throw new Error(error.message)
 }
};

const OrderService = {
    getOrders,
};

export default OrderService;

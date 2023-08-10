import axios from 'axios'
import {GetOrderResponse} from '../types'

const fetchMyOrders=async(user_id:string) :Promise<GetOrderResponse>=>{
    try {
        const response = await axios.get(`https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getOrderByUserId/${user_id}`);
        console.log(response)
        return response.data;
      } catch (error) {
        console.error('Error fetching menu:', error);
        return { success: false, data: []};
    }
}

export default fetchMyOrders;
import axios, { AxiosResponse } from 'axios';
import { Orders , ResponseDataOrders} from '../types';

const placeOrder=async (data: Orders)=>{
  try {
    const response: AxiosResponse<ResponseDataOrders> = await axios.post(
      'https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/setOrders',
      data
    );
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export default placeOrder;

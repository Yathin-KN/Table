import axios from 'axios'
import {TEST_URL} from './../../URL'
const createBill=async(user_id:string,amt:string) :Promise<any>=>{
    console.log("hello")
    console.log(user_id,amt)
    try {
        const response = await axios.get(`${TEST_URL}/api/client/createBillByUserId/${user_id}/${amt}`);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

export default createBill;
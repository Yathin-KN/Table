import axios from 'axios'
import {TEST_URL} from './../../URL'
const createBill=async(amt:string) :Promise<any>=>{
    console.log("hello")
    try {
        const response = await axios.get(`${TEST_URL}/api/client/createBillByUserId/346cf6e6-6981-4ee0-9639-9ab21eda2c0e/${amt}`);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

export default createBill;
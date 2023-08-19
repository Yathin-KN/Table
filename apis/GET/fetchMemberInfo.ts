import axios from 'axios'
import {TEST_URL} from './../../URL'
import { MData }from './../types'
const fetchMemberInfo=async(phoneNo:String) :Promise<MData[]>=>{
    try {
        console.log(phoneNo)
        const response = await axios.get(`${TEST_URL}/api/superAdmin/getMemberByPhoneNO/${phoneNo}`);
        return response.data.data;
      } catch (error) {
        console.error('Error fetching dish categories:', error);
        return [];
    }
}

export default fetchMemberInfo;
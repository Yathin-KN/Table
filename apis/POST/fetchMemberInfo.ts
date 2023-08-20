import axios from 'axios'
import {TEST_URL} from '../../URL'
const fetchMemberInfo=async(member_name:String) :Promise<any>=>{
    try {
        const response = await axios.post(`${TEST_URL}/api/client/getMemberDetailsByName`,{
           name:member_name
        });
        return response.data.data;
      } catch (error) {
        console.error('Error fetching dish categories:', error);
        return [];
    }
}

export default fetchMemberInfo;
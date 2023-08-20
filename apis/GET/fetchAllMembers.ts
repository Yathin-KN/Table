import axios from 'axios'
import {TEST_URL} from './../../URL'
const fetchAllMembers=async() :Promise<string[]>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getAllMemberNames/`);
        return response.data.data;
      } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

export default fetchAllMembers;
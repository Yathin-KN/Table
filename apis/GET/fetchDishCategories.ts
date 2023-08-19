import axios from 'axios'
import {TEST_URL} from './../../URL'
const fetchDishCategories=async() :Promise<any>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getAllDishesCategories`);
        return response.data.category_d;
      } catch (error) {
        console.error('Error fetching dish categories:', error);
        return [];
    }
}

export default fetchDishCategories;
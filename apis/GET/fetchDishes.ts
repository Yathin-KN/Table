import axios from 'axios'
import {Dish} from '../types'
import {TEST_URL} from './../../URL'
const fetchDishes=async() :Promise<Dish[]>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getAllDishes`);
        return response.data.dishes;
      } catch (error) {
        console.error('Error fetching menu:', error);
        return [];
    }
}

export default fetchDishes;
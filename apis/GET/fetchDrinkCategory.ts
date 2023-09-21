import axios from 'axios'
import {DrinksCategory} from '../types'
import { TEST_URL } from '../../URL';
const fetchDrinkCategory=async() :Promise<DrinksCategory[]>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getAllDrinksCategories`);
        return response.data.category_d;
      } catch (error) {
        console.error('Error fetching drink category:', error);
        return [];
    }
}

export default fetchDrinkCategory;
import axios from 'axios';
import { Dish } from '../types';
import { TEST_URL } from './../../URL';

const instance = axios.create();

const cache = {
  dishes: null,
  lastFetched: Number.MAX_SAFE_INTEGER,
};

instance.interceptors.request.use(async (config) => {
  if (cache.dishes) {
    return Promise.reject('Using cached data');
  }
  return config;
});

instance.interceptors.response.use(response => {
  cache.dishes = response.data.dishes;
  return response;
}, error => {
  return Promise.reject(error);
});

const fetchDishes = async (): Promise<Dish[]> => {
  try {
    if (cache.dishes) {
      return cache.dishes;
    }
    const response = await instance.get(`${TEST_URL}/api/client/getAllDishes`);
    return response.data.dishes;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return cache.dishes || [];
  }
}

const updateCache = async () => {
  try {
    const response = await instance.get(`${TEST_URL}/api/client/getAllDishes`);
    cache.dishes = response.data.dishes;
    return response.data.dishes;
  } catch (error) {
    console.error('Error updating cache:', error);
    return [];
  }
}

export { fetchDishes, updateCache };

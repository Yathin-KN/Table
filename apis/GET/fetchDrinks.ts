import axios from 'axios';
import { DrinksGET } from '../types';
import { TEST_URL } from './../../URL';

const instance = axios.create();

const cache = {
  drinks: null,
  lastFetched: Number.MAX_SAFE_INTEGER, // Set to a very large number
};

instance.interceptors.request.use(async (config) => {
  if (cache.drinks) {
    return Promise.reject('Using cached data');
  }
  return config;
});

instance.interceptors.response.use(response => {
  cache.drinks = response.data.drinks;
  return response;
}, error => {
  return Promise.reject(error);
});

const fetchDrinks = async (): Promise<DrinksGET[]> => {
  try {
    if (cache.drinks) {
      return cache.drinks;
    }
    const response = await instance.get(`${TEST_URL}/api/client/getAllDrinks`);
    return response.data.drinks;
  } catch (error) {
    console.error('Error fetching drinks:', error);
    return cache.drinks || [];
  }
}

const updateCache = async () => {
  try {
    const response = await instance.get(`${TEST_URL}/api/client/getAllDrinks`);
    cache.drinks = response.data.drinks;
    return response.data.drinks;
  } catch (error) {
    console.error('Error updating cache:', error);
    return [];
  }
}

export { fetchDrinks, updateCache };

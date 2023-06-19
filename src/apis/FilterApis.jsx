import {API} from './main';
import axios, {AxiosResponse} from 'axios';

export const FilterBusiness = async (searchQuery) => {
  console.log('called search API');
  const response = await axios.get(`${API.host}/business/search-category/?name=${searchQuery}`);
  return response.data;
};


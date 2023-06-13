import {API} from './main';
import axios, {AxiosResponse} from 'axios';

export const filterByCategory = async ({category, length}) => {
  const response = await axios.get(`${API.host}/business/filter/${category}/${length}/`);
  return response.data;
};


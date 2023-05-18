import {API} from './main';
import axios, {AxiosResponse} from 'axios';

export const getBusiness = async ({pageParam = 0}) => {
  let step = 10;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(`${API.host}/business/all/${start}/${end}/`);
  return response.data;
};

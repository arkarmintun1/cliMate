import axios, { AxiosResponse } from 'axios';
import { City } from '../models/city';

const axiosInstance = axios.create({
  baseURL: `https://api.openweathermap.org`,
  timeout: 30000,
});

export const api = {
  findCity: (cityName: string, appid: string) => {
    const url = `/geo/1.0/direct?q=${cityName}&limit=5&appid=${appid}`;
    return axiosInstance.get(url);
  },
};

export interface FindCityResponse extends AxiosResponse {
  data: City[];
}

import axios, { AxiosResponse } from 'axios';
import { City } from '../models/city';
import { Unit } from '../models/general';

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
  timeout: 30000,
});

export const api = {
  findCity: (cityName: string, appid: string) => {
    const url = `/geo/1.0/direct?q=${cityName}&limit=5&appid=${appid}`;
    return axiosInstance.get(url);
  },
  getWeather: (lat: number, lon: number, unit: Unit, appid: string) => {
    const url = `/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&units=${unit}`;
    return axiosInstance.get(url);
  },
};

export interface FindCityResponse extends AxiosResponse {
  data: City[];
}

export interface GetWeatherResponse extends AxiosResponse {
  data: WeatherResponseData;
}

export interface WeatherResponseData {
  list: {
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: [
      {
        description: string;
        icon: string;
      },
    ];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
    };
    pop: number;
    dt: number;
  }[];
}

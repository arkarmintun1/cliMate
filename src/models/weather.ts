import { WeatherResponseData } from '../services/api';

export interface Weather {
  /** Weather condition within the group (api: weather[0].description)  */
  status: string;
  /** Weather icon id (api: weather[0].icon) */
  icon: string;
  /** Temperature. Unit Metric: Celsius, Imperial: Fahrenheit. (api: main.temp) */
  temp: number;
  /** Minimum temperature at the moment. (api: main.temp_min) */
  tempMin: number;
  /** Maximum temperature at the moment.  (api: main.temp_max) */
  tempMax: number;
  /** Probability of precipitation %. (api: pop) */
  precipitation: number;
  /** Humidity, % (api: main.humidity) */
  humidity: number;
  /** Wind speed. Unit Metric: meter/sec, Imperial: miles/hour. (api: wind.speed) */
  windSpeed: number;
  /** Time of data forecasted (api: dt) */
  date: string;
}

export const fromWeatherResponse = (data: WeatherResponseData): Weather[] => {
  const weathers: { [date: string]: Weather } = {};

  data.list.forEach(value => {
    const date = new Date(value.dt * 1000).toDateString();

    let weather: Weather = weathers[date];

    if (!weather) {
      weather = {
        date,
        humidity: value.main.humidity,
        icon: value.weather[0].icon,
        status: value.weather[0].description,
        precipitation: value.pop * 100,
        temp: value.main.temp,
        tempMax: value.main.temp_max,
        tempMin: value.main.temp_min,
        windSpeed: value.wind.speed,
      };

      weathers[date] = weather;
    }
  });

  return Object.values(weathers);
};

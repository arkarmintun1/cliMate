import { Unit } from '../models';

export const getTemperatureUnit = (unit: Unit) => {
  return unit === 'imperial' ? '°F' : unit === 'metric' ? '°C' : '';
};

export const getWindSpeedUnit = (unit: Unit) => {
  return unit === 'imperial' ? 'm/s' : unit === 'metric' ? 'mph' : '';
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Unit, Weather } from '../../models';
import { RootState } from '../store';

interface AppState {
  apiKey: string;
  cities: { [id: string]: City };
  unit: Unit;
  suggestions: City[];
  weathers: {
    [id: string]: {
      [key in Unit]: Weather[];
    };
  };
  currentCityId: string;
}

const initialState: AppState = {
  apiKey:
    'b8f243632f5392fd886c4e1f095700cd:8eaf215e5de639e1b5cb177223064195:xx/ajmkwqEwV6dsfqFdWUuEiSln2ZUeR4oJRnya+GtoXFHoEnRs4DjJcTtciibXT',
  cities: {},
  unit: 'metric',
  suggestions: [],
  weathers: {},
  currentCityId: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    findCity: {
      reducer: () => {},
      prepare: (city: string) => ({ payload: city }),
    },
    findCitySuccess: {
      reducer: (state, action: PayloadAction<City[]>) => {
        state.suggestions = action.payload;
      },
      prepare: (cities: City[]) => ({ payload: cities }),
    },
    addCity: {
      reducer: (state, action: PayloadAction<City>) => {
        const city = action.payload;
        state.cities[city.id] = city;
      },
      prepare: (city: City) => ({ payload: city }),
    },
    getWeathers: () => {},
    getWeather: {
      reducer: () => {},
      prepare: (city: City) => ({ payload: city }),
    },
    getWeatherSuccess: {
      reducer: (
        state,
        action: PayloadAction<{ city: City; weathers: Weather[]; unit: Unit }>,
      ) => {
        const { city, unit, weathers } = action.payload;
        state.weathers[city.id] = {
          ...state.weathers[city.id],
          [unit]: weathers,
        };
      },
      prepare: (city: City, weathers: Weather[], unit: Unit) => ({
        payload: { city, weathers, unit },
      }),
    },
    setCurrentCityId: {
      reducer: (state, action: PayloadAction<string>) => {
        state.currentCityId = action.payload;
      },
      prepare: (cityId: string) => ({ payload: cityId }),
    },
    setUnit: {
      reducer: (state, action: PayloadAction<Unit>) => {
        state.unit = action.payload;
      },
      prepare: (unit: Unit) => ({ payload: unit }),
    },
    updateUnit: {
      reducer: () => {},
      prepare: (unit: Unit) => ({ payload: unit }),
    },
  },
});

export const appActions = appSlice.actions;

export const appSelectors = {
  apiKey: (state: RootState) => state.app.apiKey,
  cities: (state: RootState) => state.app.cities,
  unit: (state: RootState) => state.app.unit,
  suggestions: (state: RootState) => state.app.suggestions,
  cityIds: (state: RootState) =>
    state.app.weathers ? Object.keys(state.app.weathers) : [],
  cityById: (cityId: string) => (state: RootState) => state.app.cities[cityId],
  weatherByCityId: (cityId: string) => (state: RootState) =>
    state.app.weathers[cityId],
  fiveDayForecastsByCityId: (cityId: string) => (state: RootState) => {
    const unit = state.app.unit;
    const weather = state.app.weathers[cityId];
    return weather ? weather[unit] : null;
  },
  todayForecastByCityId: (cityId: string) => (state: RootState) => {
    const unit = state.app.unit;
    const weather = state.app.weathers[cityId];
    return weather && weather[unit] ? weather[unit][0] : null;
  },
  currentCityId: (state: RootState) => state.app.currentCityId,
};

export default appSlice;

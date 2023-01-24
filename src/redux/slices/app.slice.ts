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
}

const initialState: AppState = {
  apiKey:
    'b8f243632f5392fd886c4e1f095700cd:8eaf215e5de639e1b5cb177223064195:xx/ajmkwqEwV6dsfqFdWUuEiSln2ZUeR4oJRnya+GtoXFHoEnRs4DjJcTtciibXT',
  cities: {},
  unit: 'metric',
  suggestions: [],
  weathers: {},
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
        console.log({ city });
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
  city: (cityId: string) => (state: RootState) => state.app.cities[cityId],
  weather: (cityId: string) => (state: RootState) => state.app.weathers[cityId],
};

export default appSlice;

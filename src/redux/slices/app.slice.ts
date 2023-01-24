import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../models/city';
import { RootState } from '../store';

interface AppState {
  apiKey: string;
  cities: { [id: string]: City };
  suggestions: City[];
}

const initialState: AppState = {
  apiKey:
    'b8f243632f5392fd886c4e1f095700cd:8eaf215e5de639e1b5cb177223064195:xx/ajmkwqEwV6dsfqFdWUuEiSln2ZUeR4oJRnya+GtoXFHoEnRs4DjJcTtciibXT',
  cities: {},
  suggestions: [],
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
      reducer: (state, action: PayloadAction<{ id: string; city: City }>) => {
        const { id, city } = action.payload;
        state.cities[id] = city;
      },
      prepare: (id: string, city: City) => ({ payload: { id, city } }),
    },
    getWeather: {
      reducer: () => {},
      prepare: (city: City) => ({ payload: city }),
    },
  },
});

export const appActions = appSlice.actions;

export const appSelectors = {
  apiKey: (state: RootState) => state.app.apiKey,
  cities: (state: RootState) => state.app.cities,
  suggestions: (state: RootState) => state.app.suggestions,
};

export default appSlice;

import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './app.slice';

export const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
});

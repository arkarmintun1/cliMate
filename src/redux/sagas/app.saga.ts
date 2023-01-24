import _ from 'lodash';
import { call, debounce, put, select, takeEvery } from 'redux-saga/effects';
import { City } from '../../models/city';
import { api, FindCityResponse } from '../../services/api';
import { decrypt } from '../../services/encryption';
import { appActions, appSelectors } from '../slices/app.slice';

function* findCity(action: ReturnType<typeof appActions.findCity>) {
  try {
    const cityName = action.payload;
    const encryptedApiKey: string = yield select(appSelectors.apiKey);
    const apiKey: string = yield call(decrypt, encryptedApiKey);
    const response: FindCityResponse = yield call(
      api.findCity,
      cityName,
      apiKey,
    );

    if (response.status === 200) {
      const cities: City[] = response.data.map(city =>
        _.pick(city, ['name', 'lat', 'lon', 'country', 'state']),
      );
      console.log({ cities });
      yield put(appActions.findCitySuccess(cities));
    }
  } catch (e: any) {
    console.error(e);
  }
}

function* getWeather(action: ReturnType<typeof appActions.getWeather>) {
  try {
  } catch (e: any) {
    console.error(e);
  }
}

export function* appSagas() {
  yield debounce(2000, appActions.findCity.type, findCity);
  yield takeEvery(appActions.getWeather.type, getWeather);
}

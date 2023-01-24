import _ from 'lodash';
import { call, debounce, put, select, takeEvery } from 'redux-saga/effects';
import { City, fromWeatherResponse, Unit } from '../../models';
import { api, FindCityResponse, GetWeatherResponse } from '../../services/api';
import { decrypt, hashCity } from '../../services/encryption';
import { appActions, appSelectors } from '../slices/app.slice';

function* getApiKey() {
  try {
    const encryptedApiKey: string = yield select(appSelectors.apiKey);
    const apiKey: string = yield call(decrypt, encryptedApiKey);
    return apiKey;
  } catch (e: any) {
    console.error(e);
  }
}

function* findCity(action: ReturnType<typeof appActions.findCity>) {
  try {
    const cityName = action.payload;

    const apiKey: string = yield call(getApiKey);

    const response: FindCityResponse = yield call(
      api.findCity,
      cityName,
      apiKey,
    );

    if (response.status === 200) {
      const cities: City[] = [];
      for (const val of response.data) {
        const vals = _.pick(val, ['name', 'lat', 'lon', 'country', 'state']);
        const id: string | null = yield call(hashCity, vals);
        if (id) {
          const city = { id, ...vals };
          cities.push(city);
          yield put(appActions.getWeather(city));
        }
      }

      yield put(appActions.findCitySuccess(cities));
    }
  } catch (e: any) {
    console.error(e);
  }
}

function* getWeathers() {
  try {
    const cities: ReturnType<typeof appSelectors.cities> = yield select(
      appSelectors.cities,
    );

    for (const key in cities) {
      const city = cities[key];

      yield put(appActions.getWeather(city));
    }
  } catch (e: any) {
    console.error(e);
  }
}

function* getWeather(action: ReturnType<typeof appActions.getWeather>) {
  try {
    const city = action.payload;
    const unit: Unit = yield select(appSelectors.unit);

    const apiKey: string = yield call(getApiKey);

    const response: GetWeatherResponse = yield call(
      api.getWeather,
      city.lat,
      city.lon,
      unit,
      apiKey,
    );

    if (response.status === 200) {
      const weathers = fromWeatherResponse(response.data);
      console.log(weathers);
      yield put(appActions.getWeatherSuccess(city, weathers, unit));
    }
  } catch (e: any) {
    console.error(e);
  }
}

export function* appSagas() {
  yield debounce(2000, appActions.findCity.type, findCity);
  yield takeEvery(appActions.getWeathers.type, getWeathers);
  yield takeEvery(appActions.getWeather.type, getWeather);
}

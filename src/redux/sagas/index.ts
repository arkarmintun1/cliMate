import { all } from 'redux-saga/effects';
import { appSagas } from './app.saga';

export default function* rootSaga() {
  yield all([appSagas()]);
}

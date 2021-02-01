import { all } from 'redux-saga/effects';

import DetailSagas from "../redux/detailReducer/sagas"

export default function* rootSaga(getState) {
    yield all([
        DetailSagas()
    ]);
}
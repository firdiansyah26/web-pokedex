import * as actionType from '../actionTypes'
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as config  from '../../config/config'


export function* getDetail(param) {
    try {
        let _response = yield call(config.GET, config.URL.DETAIL_POKEMON + "/" + param.id)
        yield put({ type: actionType.GET_DETAIL_POKEMON_SUCCESS, value: _response.data })
    } catch (error) {
        console.log('error : ', error)
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(actionType.GET_DETAIL_POKEMON, getDetail),
    ])
}
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../actionTypes';
import ToastUtil from '../utils/ToastUtil';
import {fetchGet} from '../utils/fetchUtil';

export function* firstLoad() {
    try {
        yield take(types.fetch_Category_start);
        let ret = yield call(fetchGet, '/column/categorys');
        yield put();

    } catch (e) {
        yield ToastUtil.showShort('网络发生错误，请重试');
    }
}
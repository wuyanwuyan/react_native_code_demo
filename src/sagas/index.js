import { all, fork } from 'redux-saga/effects';
import {firstLoad} from './article';
export function* helloSaga() {
    console.log('Hello Sagas!')
}

export default function* rootSaga() {
    yield all([firstLoad()]);
}
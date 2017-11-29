import {fork,all} from 'redux-saga/effects';
import {firstLoad, fetchArticle} from './article';

export default function* rootSaga() {
    yield all([
        fork(firstLoad),
        fork(fetchArticle)
    ]);
}
import {fork} from 'redux-saga/effects';
import {firstLoad, fetchArticle} from './article';

export default function* rootSaga() {
    yield [
        fork(firstLoad),
        fork(fetchArticle)
    ];
}
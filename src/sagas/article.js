import {put, take, call, fork, takeEvery} from 'redux-saga/effects';
import * as types from '../actionTypes';
import ToastUtil from '../utils/ToastUtil';
import {fetchGet} from '../utils/fetchUtil';

export function* firstLoad() {
    try {
        yield take(types.first_load_start);
        let cateList = yield call(fetchGet, '/column/categorys');
        yield put({type: types.first_load_success, cateList});
    } catch (e) {
        yield ToastUtil.showShort('网络发生错误，请重试');
    }
}

export function *fetchArticle() {
    yield takeEvery(types.fetch_Article_start, function*(action) {
        try {
            let {categoryId, offset} = action;
            let data = yield call(getArticles, categoryId, offset);
            yield put({type: types.fetch_Article_success, data, categoryId});
        } catch (e) {
            yield ToastUtil.showShort('网络发生错误，请重试');
        }
    });
}

function getArticles(categoryId, offset = 0, limit = 10) {
    var query = {categoryId, state: 1, offset, limit};
    return fetchGet("/column/articles", query);
}

// 获取前三篇文章，用于滚动显示
function getTopArticle() {
    return fetchGet("/column/mainPage/imageInfo");
}
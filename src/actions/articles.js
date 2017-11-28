import * as types from '../actionTypes';

export function firstLoad() {
    return {
        type: types.first_load_start
    }
}

export function loadMoreArticle(categoryId,offset=0) {
    return {
        type: types.fetch_Article_start,
        categoryId,
        offset,
    }
}
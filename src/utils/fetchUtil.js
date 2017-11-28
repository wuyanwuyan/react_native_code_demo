import server from '../config/server';

export function fetchGetTest(url, query) {
    console.log('fetching data');
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            resovle(query);
        }, 2000)
    })
}


export function fetchGet(url, query={}, option = {}) {
    __DEV__ && console.log('fetch ',url);
    let isOk;
    let serializeQuery = serialize(query);
    let finalUrl = `${server.backend}${url}` + (serializeQuery?`?${serializeQuery}`:'');
    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response) => {
                isOk = !!response.ok
                return response.json();
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export function fetchPost(url) {

}

export function fetchPut(url) {

}

export function fetchDelete(url) {

}

export function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
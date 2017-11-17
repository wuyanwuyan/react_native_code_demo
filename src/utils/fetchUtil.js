export function fetchGet(url,query) {
    console.log('fetching data');
    return new Promise((resovle,reject)=>{
        setTimeout(()=>{
            resovle(query);
        },2000)
    })
}


export function fetchPost() {

}

export function fetchPut() {

}

export function fetchDelete() {

}
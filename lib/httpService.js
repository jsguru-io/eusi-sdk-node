import requestPromise from 'request-promise';

const get = (url, config) => {
    return requestPromise({
        method: 'GET',
        uri: url,
        headers: config.headers,
        qs: config.params,
        json: true
    });
};

const post = (url, config) => {
    return requestPromise({
        method: 'POST',
        uri: url,
        headers: config.headers,
        body: config.body,
        json: true
    });
};

export default {
    get,
    post
};
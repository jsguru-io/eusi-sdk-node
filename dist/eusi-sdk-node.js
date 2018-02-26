'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var requestPromise = _interopDefault(require('request-promise'));
var eusiCore = _interopDefault(require('eusi-sdk-core'));

var get = function get(url, config) {
    return requestPromise({
        method: 'GET',
        uri: url,
        headers: config.headers,
        qs: config.params,
        json: true
    });
};

var post = function post(url, config) {
    return requestPromise({
        method: 'POST',
        uri: url,
        headers: config.headers,
        body: config.body,
        json: true
    });
};

var nodeHttpService = {
    get: get,
    post: post
};

var index = (function (_ref) {
    var bucketKey = _ref.bucketKey,
        bucketSecret = _ref.bucketSecret,
        deliveryApi = _ref.deliveryApi;
    return eusiCore({
        deliveryApi: deliveryApi,
        HttpService: nodeHttpService
    })({
        bucketKey: bucketKey,
        bucketSecret: bucketSecret
    });
});

module.exports = index;

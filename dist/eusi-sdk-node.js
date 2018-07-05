'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var requestPromise = _interopDefault(require('request-promise'));
var crypto = _interopDefault(require('crypto'));
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

var signPayload = function signPayload(payload, secretKey) {
    return crypto.createHmac('sha256', JSON.stringify(payload)).update(secretKey).digest('hex').toUpperCase();
};

var signatureValidator = (function (signature, _ref) {
    var secretKey = _ref.secretKey,
        payload = _ref.payload;

    var correctSignature = signPayload(payload, secretKey);
    return correctSignature === signature;
});

var eusiNode = function eusiNode(_ref) {
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
};

eusiNode.isValidPaymentNotification = function (signature, _ref2) {
    var bucketSecret = _ref2.bucketSecret,
        payload = _ref2.payload;
    return signatureValidator(signature, {
        secretKey: bucketSecret,
        payload: payload
    });
};

module.exports = eusiNode;

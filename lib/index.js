import eusiCore from 'eusi-sdk-core';
import nodeHttpService from './httpService';
import signatureValidator from './signatureValidator';

const eusiNode = ({ bucketKey, bucketSecret, deliveryApi }) => eusiCore({
    deliveryApi,
    HttpService: nodeHttpService
})({
    bucketKey,
    bucketSecret
});

eusiNode.isValidPaymentNotification = (signature, { bucketSecret, payload }) => signatureValidator(signature, {
    secretKey: bucketSecret,
    payload
});

export default eusiNode;

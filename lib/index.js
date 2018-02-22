import eusiCore from 'eusi-core';
import nodeHttpService from './httpService';

export default ({ bucketKey, bucketSecret, deliveryApi }) => eusiCore({
    deliveryApi,
    HttpService: nodeHttpService
})({
    bucketKey,
    bucketSecret
});

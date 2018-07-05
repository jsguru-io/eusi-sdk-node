import crypto from 'crypto';

const signPayload = (payload, secretKey) => crypto
    .createHmac('sha256', JSON.stringify(payload))
    .update(secretKey)
    .digest('hex')
    .toUpperCase();

export default (signature, { secretKey, payload }) => {
    const correctSignature = signPayload(payload, secretKey);
    return correctSignature === signature;
};


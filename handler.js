'use strict';

const AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();

module.exports.get = async (event, context, callback) => {
    event.Records.forEach(record => {
        const payload = new Buffer(record.kinesis.data, 'base64').toString('utf-8');
        console.log(JSON.parse(payload).message);
    });

    callback(null, 'Success');
};

module.exports.put = async (event, context, callback) => {
    kinesis.putRecord({
        StreamName: 'test-kinesis-stream',
        Data: JSON.stringify({
            name: 'Patrick Ortiz',
            message: 'This is a test',
            dob: 'Sept 21 1979'
        }),
        PartitionKey: '1'
    }, (err, data) => {
        if (err) {
            console.log('ERROR', err);
        } else {
            console.log('SUCCESS', data);
        }
    });

    callback(null, {statusCode: 200, body: 'OK'});
};

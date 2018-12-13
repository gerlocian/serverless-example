'use strict';

const AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();

module.exports.get = async (event, context, callback) => {
    // event.kinesis.forEach()
    // console.log(event.kinesis);
    console.log(event);
    // console.log(context);
    callback(null, 'Success');

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     message: 'Go Serverless v1.0! Your function executed successfully!',
    //     input: event,
    //   }),
    // };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.put = async (event, context, callback) => {
    kinesis.putRecord({
        StreamName: 'test-kinesis-stream',
        Data: 'This is a test',
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

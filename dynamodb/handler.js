'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const env = require('process').env;

module.exports.write = async (event, context, callback) => {
    const params = {
        TableName: env.tableName,
        Item: {
            id: '1',
            value: Date.now()
        }
    };

    dynamodb.put(params, function (err) {
        console.log('callback');
        if (err) {
            console.log('ERROR:', err, err.stack);
        } else {
            console.log('SUCCESS');
        }
    });

    callback(null, {statusCode: 200, body: 'Doneski'});
};

module.exports.watch = async (event, context, callback) => {
    event.Records.forEach(record => {
        console.log(record.dynamodb);
    });
    callback(null, 'OK');
};

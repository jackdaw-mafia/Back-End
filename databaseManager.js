"use strict";

const AWS = require("aws-sdk");
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.ITEMS_DYNAMODB_TABLE;

module.exports.initializateDynamoClient = newDynamo => {
  dynamo = newDynamo;
};

module.exports.saveItem = item => {
  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  return dynamo
    .put(params)
    .promise()
    .then(() => {
      return item;
    });
};

module.exports.getItem = itemId => {
  const params = {
    Key: {
      itemId: itemId
    },
    TableName: TABLE_NAME
  };
  return dynamo
    .get(params)
    .promise()
    .then(result => {
      return result.Item;
    });
};

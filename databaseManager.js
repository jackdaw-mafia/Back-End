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

module.exports.listItem = () => {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: "#dt = :offer",
    ExpressionAttributeNames: {
      "#dt": "data_type"
    },
    ExpressionAttributeValues: {
      ":offer": "offer"
    }
  };
  return dynamo
    .scan(params)
    .promise()
    .then(result => {
      //console.log(result);
      const itemsArray = result.Items;
      const updatedResult = itemsArray.map(item => {
        const { createdAt, duration } = item;
        const durationMili = 60000 * duration;
        const finishesAt = durationMili + createdAt;
        const durationInSeconds = (finishesAt - Date.now()) / 1000;
        const newItem = { ...item, finishesAt, durationInSeconds };
        return newItem;
      });
      //console.log(updatedResult);
      return updatedResult;
    });
};

module.exports.deleteItem = itemId => {
  const params = {
    Key: {
      itemId: itemId
    },
    TableName: TABLE_NAME
  };

  return dynamo
    .delete(params)
    .promise()
    .then(result => {
      return result;
    });
};

module.exports.updateOffer = (itemId, paramsName, paramsValue) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      itemId
    },
    UpdateExpression: "set " + paramsName + " = :v",
    ExpressionAttributeValues: {
      ":v": paramsValue
    },
    ReturnValues: "ALL_NEW"
  };
  return dynamo
    .update(params)
    .promise()
    .then(response => {
      return response.Attributes;
    });
};

module.exports.updateProfile = (itemId, body) => {
  const timestamp = new Date().getTime();
  const params = {
    TableName: TABLE_NAME,
    Key: {
      itemId: itemId
    },
    ExpressionAttributeValues: {
      ":email": body.email,
      ":photoUri": body.photoUri,
      ":shortDescription": body.shortDescription,
      ":longDescription": body.longDescription,
      ":checked": body.checked,
      ":updatedAt": timestamp
    },
    UpdateExpression:
      "SET email = :email, photoUri = :photoUri, shortDescription = :shortDescription, longDescription = :longDescription, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW"
  };

  return dynamo
    .update(params)
    .promise()
    .then(response => {
      return response.Attributes;
    });
};

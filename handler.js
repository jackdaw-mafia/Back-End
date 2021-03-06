"use strict";

const databaseManager = require("./databaseManager");
const uuidv1 = require("uuid/v1");

function createResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

module.exports.saveProfile = (event, context, callback) => {
  const item = JSON.parse(event.body);
  const timestamp = new Date().getTime();
  console.log(item);
  //item.itemId = uuidv1();
  item.createdAt = timestamp;

  databaseManager.saveItem(item).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.saveOffer = (event, context, callback) => {
  const item = JSON.parse(event.body);
  const timestamp = new Date().getTime();
  console.log(item);
  item.itemId = uuidv1();
  item.createdAt = timestamp;

  databaseManager.saveItem(item).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.getItem = (event, context, callback) => {
  const itemId = event.pathParameters.itemId;

  databaseManager.getItem(itemId).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.listItem = (event, context, callback) => {
  // const itemId = event.pathParameters.itemId;

  databaseManager.listItem().then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.deleteItem = (event, context, callback) => {
  const itemId = event.pathParameters.itemId;

  databaseManager.deleteItem(itemId).then(response => {
    callback(null, createResponse(204, response));
  });
};

module.exports.updateOffer = (event, context, callback) => {
  const itemId = event.pathParameters.itemId;
  const timestamp = new Date().getTime();
  const body = JSON.parse(event.body);
  const paramName = body.paramName;
  const paramValue = body.paramValue;
  body.updatedAt = timestamp;

  databaseManager.updateItem(itemId, paramName, paramValue).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.updateProfile = (event, context, callback) => {
  const itemId = event.pathParameters.itemId;
  //console.log(itemId);
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  data.updatedAt = timestamp;

  databaseManager.updateProfile(itemId, data).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.triggerStream = (event, context, callback) => {
  console.log("trigger stream was called");

  //const eventData = event.Records[0];
  //console.log(eventData);

  console.log(eventData.dynamodb.NewImage);
  callback(null, null);
};

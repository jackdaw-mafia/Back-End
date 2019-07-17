"use strict";

require("./config");

const assert = require("chai").assert;
const databaseManager = require("../databaseManager");
var AWS = require("aws-sdk");

beforeAll(() => {
  const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
  });

  databaseManager.initializateDynamoClient(dynamo);
});

afterAll(() => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  databaseManager.initializateDynamoClient(dynamo);
});

describe("Test database save and get item", () => {
  const item = {
    itemId: "itemId",
    id: "data.id",
    data_type: "data.data_type",
    venueName: "data.venueName",
    address: "data.address",
    longitude: "data.longitude",
    latitude: "data.latitude",
    email: "data.email",
    photoUri: "data.photoUri",
    shortDescription: "data.shortDescription",
    longDescription: "data.longDescription",
    phoneNumber: "data.phoneNumber",
    place_id: "data.place_id",
    createdAt: "timestamp",
    updatedAt: "timestamp"
  };

  it("save an item", done => {
    databaseManager.saveItem(item).then(result => {
      assert.equal("itemId", result.itemId);
      assert.equal(item.id, result.id);
      assert.equal(item.data_type, result.data_type);
      assert.equal(item.venueName, result.venueName);
      assert.equal(item.address, result.address);
      assert.equal(item.longtitude, result.longtitude);
      assert.equal(item.latitude, result.latitude);
      assert.equal(item.email, result.email);
      assert.equal(item.photoUri, result.photoUri);
      assert.equal(item.shortDescription, result.shortDescription);
      assert.equal(item.longDescription, result.longDescription);
      assert.equal(item.phoneNumber, result.phoneNumber);
      assert.equal(item.place_id, result.place_id);
      assert.equal(item.createdAt, result.createdAt);
      assert.equal(item.updatedAt, result.updatedAt);
      done();
    });
  });
  it("get an item", done => {
    databaseManager.getItem("itemId").then(result => {
      assert.equal("itemId", result.itemId);
      assert.equal(item.id, result.id);
      assert.equal(item.data_type, result.data_type);
      assert.equal(item.venueName, result.venueName);
      assert.equal(item.address, result.address);
      assert.equal(item.longtitude, result.longtitude);
      assert.equal(item.latitude, result.latitude);
      assert.equal(item.email, result.email);
      assert.equal(item.photoUri, result.photoUri);
      assert.equal(item.shortDescription, result.shortDescription);
      assert.equal(item.longDescription, result.longDescription);
      assert.equal(item.phoneNumber, result.phoneNumber);
      assert.equal(item.place_id, result.place_id);
      assert.equal(item.createdAt, result.createdAt);
      assert.equal(item.updatedAt, result.updatedAt);
      done();
    });
  });
});

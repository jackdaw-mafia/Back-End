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
    venueName: "data.venueName",
    data_type: "data.data_type",
    duration: "data.duration",
    price: "data.price",
    drink: "data.drink",
    quantity: "data.quantity",
    type: "data.type",
    coupon_id: "data.coupon_id",
    active: "data.active",
    createdAt: "timestamp",
    updatedAt: "timestamp"
  };

  it("save an item", done => {
    databaseManager.saveItem(item).then(result => {
      assert.equal("itemId", result);
      done();
    });
  });
  it("get an item", done => {
    databaseManager.getItem("itemId").then(result => {
      assert.equal(item.itemId, result.itemId);
      assert.equal(item.venueName, result.venueName);
      assert.equal(item.data_type, result.data_type);
      assert.equal(item.duration, result.duration);
      assert.equal(item.price, result.price);
      assert.equal(item.drink, result.drink);
      assert.equal(item.quantity, result.quantity);
      assert.equal(item.type, result.type);
      assert.equal(item.coupon_id, result.coupon_id);
      assert.equal(item.active, result.active);
      assert.equal(item.createdAt, result.createdAt);
      assert.equal(item.updatedAt, result.updatedAt);
      done();
    });
  });
});

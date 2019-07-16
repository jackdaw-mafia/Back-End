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
    name: "itemName",
    status: "itemStatus"
  };

  it("save an item", done => {
    databaseManager.saveItem(item).then(result => {
      assert.equal("itemId", result);
      done();
    });
  });
});

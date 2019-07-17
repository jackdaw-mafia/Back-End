"use strict";

require("./config");

const { assert, expect } = require("chai");

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

describe("Test database", () => {
  const profile = {
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

  const offer1 = {
    quantity: "6",
    active: "true",
    createdAt: 1563371756191,
    coupon_id: "sdfghjuiop456789",
    venueName: "venueName from state here",
    itemId: "994d22f0-a89a-11e9-adf3-5d72d8ad7022",
    price: "£3.00",
    id: "this will be the cognito id",
    drink: "Gin and Tonic",
    duration: 30,
    data_type: "offer",
    type: "beer"
  };
  const offer2 = {
    quantity: "6",
    active: "true",
    coupon_id: "sdfghjuiop456789",
    venueName: "venueName from state here",
    itemId: "8ba83180-a895-11e9-80d2-73f00ee499d4",
    price: "£3.00",
    id: "this will be the cognito id",
    drink: "Gin and Tonic",
    data_type: "offer",
    duration: 30,
    createdAt: 1563371759191
  };

  it("saves/creates an item", done => {
    databaseManager.saveItem(profile).then(result => {
      assert.equal("itemId", result.itemId);
      assert.equal(profile.id, result.id);
      assert.equal(profile.data_type, result.data_type);
      assert.equal(profile.venueName, result.venueName);
      assert.equal(profile.address, result.address);
      assert.equal(profile.longtitude, result.longtitude);
      assert.equal(profile.latitude, result.latitude);
      assert.equal(profile.email, result.email);
      assert.equal(profile.photoUri, result.photoUri);
      assert.equal(profile.shortDescription, result.shortDescription);
      assert.equal(profile.longDescription, result.longDescription);
      assert.equal(profile.phoneNumber, result.phoneNumber);
      assert.equal(profile.place_id, result.place_id);
      assert.equal(profile.createdAt, result.createdAt);
      assert.equal(profile.updatedAt, result.updatedAt);
      done();
    });
  });
  it("GET an item", done => {
    databaseManager.getItem("itemId").then(result => {
      assert.equal("itemId", result.itemId);
      assert.equal(profile.id, result.id);
      assert.equal(profile.data_type, result.data_type);
      assert.equal(profile.venueName, result.venueName);
      assert.equal(profile.address, result.address);
      assert.equal(profile.longtitude, result.longtitude);
      assert.equal(profile.latitude, result.latitude);
      assert.equal(profile.email, result.email);
      assert.equal(profile.photoUri, result.photoUri);
      assert.equal(profile.shortDescription, result.shortDescription);
      assert.equal(profile.longDescription, result.longDescription);
      assert.equal(profile.phoneNumber, result.phoneNumber);
      assert.equal(profile.place_id, result.place_id);
      assert.equal(profile.createdAt, result.createdAt);
      assert.equal(profile.updatedAt, result.updatedAt);
      done();
    });
  });
  it("DELETE an item", done => {
    databaseManager.deleteItem("itemId").then(result => {
      assert.isUndefined(result.itemID);
      done();
    });
  });
  it("updates an item", done => {
    const paramName = "address";
    const paramValue = "Ancoats";
    databaseManager.updateItem("itemId", paramName, paramValue).then(result => {
      // console.log(result);
      assert.equal(result.address, "Ancoats");
      done();
    });
  });
  it("LIST items", done => {
    databaseManager.saveItem(offer1).then(result => {
      databaseManager.saveItem(offer2).then(result => {
        databaseManager.listItem().then(result => {
          assert.hasAnyKeys(new Map(result, ["finishesAt"]));
          expect(result[0].finishesAt).to.equal(1563373556191);
          expect(result[1].finishesAt).to.equal(1563373559191);
          done();
        });
      });
    });
  });
});

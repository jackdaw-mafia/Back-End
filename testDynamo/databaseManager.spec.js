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
  const profile1 = {
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
    place_id: "data.place_id"
  };
  const profile2 = {
    itemId: "itemId",
    id: "data.id",
    data_type: "data.data_type",
    venueName: "data.venueName",
    address: "data.address",
    longitude: "data.longitude",
    latitude: "data.latitude",
    email: "data.email",
    photoUri: "CHANGE",
    shortDescription: "CHANGE",
    longDescription: "CHANGE",
    phoneNumber: "data.phoneNumber",
    place_id: "data.place_id"
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
    databaseManager.saveItem(profile1).then(result => {
      assert.equal("itemId", result.itemId);
      assert.equal(profile1.id, result.id);
      assert.equal(profile1.data_type, result.data_type);
      assert.equal(profile1.venueName, result.venueName);
      assert.equal(profile1.address, result.address);
      assert.equal(profile1.longtitude, result.longtitude);
      assert.equal(profile1.latitude, result.latitude);
      assert.equal(profile1.email, result.email);
      assert.equal(profile1.photoUri, result.photoUri);
      assert.equal(profile1.shortDescription, result.shortDescription);
      assert.equal(profile1.longDescription, result.longDescription);
      assert.equal(profile1.phoneNumber, result.phoneNumber);
      assert.equal(profile1.place_id, result.place_id);
      assert.equal(profile1.createdAt, result.createdAt);
      assert.equal(profile1.updatedAt, result.updatedAt);
      done();
    });
  });
  it("GET an item", done => {
    databaseManager.getItem("itemId").then(result => {
      assert.equal("itemId", result.itemId);
      assert.equal(profile1.id, result.id);
      assert.equal(profile1.data_type, result.data_type);
      assert.equal(profile1.venueName, result.venueName);
      assert.equal(profile1.address, result.address);
      assert.equal(profile1.longtitude, result.longtitude);
      assert.equal(profile1.latitude, result.latitude);
      assert.equal(profile1.email, result.email);
      assert.equal(profile1.photoUri, result.photoUri);
      assert.equal(profile1.shortDescription, result.shortDescription);
      assert.equal(profile1.longDescription, result.longDescription);
      assert.equal(profile1.phoneNumber, result.phoneNumber);
      assert.equal(profile1.place_id, result.place_id);
      assert.equal(profile1.createdAt, result.createdAt);
      assert.equal(profile1.updatedAt, result.updatedAt);
      done();
    });
  });
  it("DELETE an item", done => {
    databaseManager.deleteItem("itemId").then(result => {
      assert.isUndefined(result.itemID);
      done();
    });
  });
  it("updates an offer one paramName and paramValue at a time", done => {
    const paramName = "address";
    const paramValue = "Ancoats";
    databaseManager
      .updateOffer("itemId", paramName, paramValue)
      .then(result => {
        // console.log(result);
        assert.equal(result.address, "Ancoats");
        done();
      });
  });
  it("updates a profile all at once", done => {
    databaseManager.saveItem(profile1).then(result => {
      databaseManager.updateProfile("itemId", profile2).then(result => {
        console.log(result);
        assert.equal("itemId", result.itemId);
        assert.equal(profile2.id, result.id);
        assert.equal(profile2.data_type, result.data_type);
        assert.equal(profile2.venueName, result.venueName);
        assert.equal(profile2.address, result.address);
        assert.equal(profile2.longtitude, result.longtitude);
        assert.equal(profile2.latitude, result.latitude);
        assert.equal(profile2.email, result.email);
        assert.equal(profile2.photoUri, result.photoUri);
        assert.equal(profile2.shortDescription, result.shortDescription);
        assert.equal(profile2.longDescription, result.longDescription);
        assert.equal(profile2.phoneNumber, result.phoneNumber);
        assert.equal(profile2.place_id, result.place_id);
        assert.equal(profile2.createdAt, result.createdAt);
        //assert.equal(profile2.updatedAt, result.updatedAt);
        done();
      });
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

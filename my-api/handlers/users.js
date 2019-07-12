"use strict";

const db = require("../config/database");
const sequelize = db.sequelize;

// exports.list = async (event, context, callback) => {
// sequelize
//   .query(`SELECT * FROM users`, { type: sequelize.QueryTypes.SELECT })
//     .then(users => {
//       return users;
//     });
//   callback(null, { message: "Finished", event });
// };

exports.list = async (event, context) => {
  sequelize.query("SELECT * FROM users").then(users => {
    console.log(users);
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "this returns a list of users"
    })
  };
};

// exports.get = async (event, context) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "this returns an individual user"
//     })
//   };
// };

// exports.add = async (event, context) => {
//   return { statusCode: 200, body: "this adds a user" };
// };

// exports.update = async (event, context) => {
//   return { statusCode: 200, body: "this updates a user" };
// };

// exports.remove = async (event, context) => {
//   return { statusCode: 200, body: "this removes a user" };
// };

const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");
const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DB_URL }
    : require("../knexfile.js");

module.exports = knex(dbConfig);

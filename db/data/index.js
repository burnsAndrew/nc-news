const ENV = process.env.NODE_ENV || "development";

const development = require("./dev-data");
const test = require("./test-data");

const data = {
  test,
  development,
  production: development
};

module.exports = data[ENV];

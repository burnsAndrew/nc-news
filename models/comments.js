const connection = require("../db/connection");

exports.selectComments = ({}) => {
  return connection.select("*").from("comments");
};

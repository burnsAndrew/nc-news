const connection = require("../db/connection");

exports.selectUsers = ({ username }) => {
  return connection
    .select("*")
    .from("users")
    .where("users.username", "=", username);
};

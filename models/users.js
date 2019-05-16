const connection = require("../db/connection");

exports.selectUsers = username => {
  return connection
    .select("*")
    .from("users")
    .groupBy("users.username")
    .where("users.username", "=", username);
};

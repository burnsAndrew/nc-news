const connection = require("../db/connection");

exports.selectUsers = ({ username }) => {
  return connection
    .select("*")
    .from("users")
    .where("users.username", "=", username);
};

exports.selectAllUsers = () => {
  return connection.select("*").from("users");
};

exports.writeUser = newUser => {
  return connection("users")
    .insert(newUser)
    .returning("*");
};

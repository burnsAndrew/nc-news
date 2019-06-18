const connection = require("../db/connection");

exports.selectTopics = () => {
  return connection.select("*").from("topics");
};

exports.writeTopic = newTopic => {
  return connection("topics")
    .insert(newTopic)
    .returning("*");
};

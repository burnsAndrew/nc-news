// const { } = require("../../utils")
// this will be for when I use a reference object and a function to format the data

const {
  topicsData,
  usersData,
  articlesData,
  commentsData
} = require("../data");

exports.seed = (connection, Promise) => {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      return connection("topics")
        .insert(topicsData)
        .returning("*");
    });
};

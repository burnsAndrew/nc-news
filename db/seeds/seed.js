const { dateConverter } = require("../../utils/data-handler");

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
    })
    .then(() => {
      return connection("users")
        .insert(usersData)
        .returning("*");
    })
    .then(() => {
      const formattedDate = dateConverter(articlesData);
      return connection("articles")
        .insert(formattedDate)
        .returning("*");
    });
};

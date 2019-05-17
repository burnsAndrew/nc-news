const {
  dateConverter,
  renameKeys,
  createRef,
  formatData
} = require("../../utils/data-handler");

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
      const formattedArticles = dateConverter(articlesData);
      return connection("articles")
        .insert(formattedArticles)
        .returning("*");
    })
    .then(articleRows => {
      const formattedDateOfComments = dateConverter(commentsData);
      const formatAuthor = renameKeys(
        formattedDateOfComments,
        "created_by",
        "author"
      );
      const refLookUp = createRef(articleRows, "title", "article_id");

      const updatedCommentsData = formatData(formatAuthor, refLookUp);
      return connection("comments")
        .insert(updatedCommentsData)
        .returning("*");
    });
};

const connection = require("../db/connection");

exports.selectArticles = ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic
}) => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comment_id AS comment_count")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where("articles.author", "=", author);
    })
    .modify(query => {
      if (topic) query.where("articles.topic", "=", topic);
    });
};

exports.selectArticlesById = article_id => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.body",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comment_id AS comment_count")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id);
};

exports.patchArticleVoteScore = (article_id, inc_votes = 0) => {
  return connection("articles")
    .where("article_id", "=", article_id)
    .increment("votes", inc_votes)
    .returning("*");
};

exports.selectCommentsByArticleId = (
  { article_id },
  { sort_by = "created_at", order = "desc" }
) => {
  return connection
    .select(
      "comments.comment_id",
      "comments.votes",
      "comments.created_at",
      "comments.author",
      "comments.body"
    )
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .orderBy(sort_by, order)
    .returning("*");
};

exports.writeComment = newComment => {
  newComment.author = newComment.username;
  delete newComment.username;
  return connection("comments")
    .insert(newComment)
    .returning("*");
};

exports.authorExists = () => {};

exports.topicExists = () => {};

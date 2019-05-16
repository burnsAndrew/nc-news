const {
  selectArticles,
  selectArticlesById,
  selectCommentsByArticleId
} = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  selectArticles(req.query).then(articles => {
    res.status(200).send({ articles });
  });
};

exports.sendArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id).then(article =>
    res.status(200).send({ article })
  );
};

exports.sendCommentsByArticleId = (req, res, next) => {
  selectCommentsByArticleId().then(comments =>
    res.status(200).send({ comments })
  );
};

exports.updateArticleVoteScore = (req, res, next) => {};

exports.sendComment = (req, res, next) => {
  selectComment().then(comment => res.status(200).send({ comment }));
};

exports.sendCommentsByArticleId = (req, res, next) => {
  selectCommentsByArticleId().then(comments =>
    res.status(200).send({ comments })
  );
};

exports.sendComment = (req, res, next) => {
  selectComment().then(comment => res.status(200).send({ comment }));
};

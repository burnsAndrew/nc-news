const {
  selectArticles,
  selectArticlesById,
  patchArticleVoteScore,
  selectCommentsByArticleId
} = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  selectArticles(req.query).then(articles => {
    res.status(200).send({ articles });
  });
};

exports.sendArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(article => res.status(200).send({ article }))
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  selectCommentsByArticleId()
    .then(comments => res.status(200).send({ comments }))
    .catch(next);
};

exports.updateArticleVoteScore = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchArticleVoteScore(article_id, inc_votes)
    .then(([article]) => res.status(200).send({ article }))
    .catch(next);
};

exports.sendComment = (req, res, next) => {
  selectComment()
    .then(comment => res.status(201).send({ comment }))
    .catch(next);
};

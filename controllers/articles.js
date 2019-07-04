const {
  selectArticles,
  selectArticlesById,
  patchArticleVoteScore,
  selectCommentsByArticleId,
  writeComment,
  deleteArticleByArticleId,
  writeArticle
} = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      if (!articles.length) {
        return Promise.reject({ status: 404, msg: "Page Not Found" });
      } else {
        res.status(200).send({ articles });
      }
    })
    .catch(next);
};

exports.sendArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  selectCommentsByArticleId(req.params, req.query)
    .then(comments => {
      if (!comments) {
        return Promise.reject({ status: 404, msg: "Page Not Found" });
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch(next);
};

exports.updateArticleVoteScore = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchArticleVoteScore(article_id, inc_votes)
    .then(([article]) => {
      if (inc_votes > 1) res.status(400).send({ msg: "Bad Request" });
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  writeComment({ ...req.params, ...req.body })
    .then(([comment]) => {
      if (!comment.author)
        return Promise.reject({ status: 400, msg: "Bad Request" });
      else res.status(201).send({ comment });
    })
    .catch(next);
};

exports.removeArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticleByArticleId(article_id)
    .then(result => {
      if (result === 0) res.status(404).send({ msg: "Article does not exist" });
      else res.sendStatus(204);
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  writeArticle({ ...req.params, ...req.body })
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

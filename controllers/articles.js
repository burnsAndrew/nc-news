const { selectArticles, selectArticlesById } = require("../models/articles");

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

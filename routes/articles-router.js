const articlesRouter = require("express").Router();
const { sendArticles } = require("../controllers/articles");

articlesRouter.route("/").get(sendArticles);

module.exports = articlesRouter;

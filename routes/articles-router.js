const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesById,
  updateArticleVoteScore,
  sendCommentsByArticleId,
  sendComment
} = require("../controllers/articles");
const { methodNotAllowed } = require("../errors/index");

articlesRouter.route("/").get(sendArticles);
articlesRouter
  .route("/:article_id")
  .get(sendArticlesById)
  .patch(updateArticleVoteScore)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId)
  .post(sendComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;

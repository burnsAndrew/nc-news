const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesById,
  updateArticleVoteScore,
  sendCommentsByArticleId,
  postComment,
  removeArticleByArticleId
} = require("../controllers/articles");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id")
  .get(sendArticlesById)
  .patch(updateArticleVoteScore)
  .delete(removeArticleByArticleId)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId)
  .post(postComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;

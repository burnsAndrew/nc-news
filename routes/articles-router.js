const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesById,
  updateArticleVoteScore,
  sendCommentsByArticleId,
  postComment
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
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId)
  .post(postComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;

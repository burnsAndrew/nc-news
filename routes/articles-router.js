const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesById,
  updateArticleVoteScore,
  sendCommentsByArticleId,
  sendComment
} = require("../controllers/articles");

articlesRouter.route("/").get(sendArticles);
articlesRouter
  .route("/:article_id")
  .get(sendArticlesById)
  .patch(updateArticleVoteScore);
articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId)
  .post(sendComment);

module.exports = articlesRouter;

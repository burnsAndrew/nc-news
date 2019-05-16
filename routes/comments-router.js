const commentsRouter = require("express").Router();
const {
  updateCommentVoteScore,
  removeCommentByCommentId
} = require("../controllers/comments");
const { methodNotAllowed } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVoteScore)
  .delete(removeCommentByCommentId)
  .all(methodNotAllowed);

module.exports = commentsRouter;

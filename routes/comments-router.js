const commentsRouter = require("express").Router();
const {
  updateCommentVoteScore,
  removeCommentByCommentId
} = require("../controllers/comments");

commentsRouter
  .route("/:commend_id")
  .patch(updateCommentVoteScore)
  .delete(removeCommentByCommentId);

module.exports = commentsRouter;

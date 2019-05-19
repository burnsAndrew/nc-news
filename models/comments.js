const connection = require("../db/connection");

exports.amendCommentVoteScore = (comment_id, inc_votes = 0) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", inc_votes)
    .returning("*");
};

exports.deleteCommentByCommentId = comment_id => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del();
};

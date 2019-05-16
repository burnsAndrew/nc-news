const {
  amendCommentVoteScore,
  deleteCommentByCommentId
} = require("../models/comments");

exports.updateCommentVoteScore = (req, res, next) => {
  amendCommentVoteScore().then(comment => {
    res.status(200).send({ comment });
  });
};

exports.removeCommentByCommentId = (req, res, next) => {
  deleteCommentByCommentId().then(comment => {
    res.status(204).send({ comment });
  });
  //should return no content
};

const {
  amendCommentVoteScore,
  deleteCommentByCommentId
} = require("../models/comments");

exports.updateCommentVoteScore = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  amendCommentVoteScore(comment_id, inc_votes)
    .then(([comment]) => res.status(200).send({ comment }))
    .catch(next);
};

exports.removeCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentByCommentId(comment_id)
    .then(result => {
      if (result === 0)
        return Promise.reject({ code: 404, msg: "Comment does not exist" });
      else res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
};

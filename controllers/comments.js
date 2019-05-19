const {
  amendCommentVoteScore,
  deleteCommentByCommentId
} = require("../models/comments");

exports.updateCommentVoteScore = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  amendCommentVoteScore(comment_id, inc_votes)
    .then(([comment]) => {
      if (inc_votes !== 1) res.status(400).send({ msg: "Bad Request" });
      else if (!comment_id) res.status(404).send({ msg: "Comment Not Found" });
      else res.status(200).send({ comment });
    })
    .catch(next);
};

exports.removeCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentByCommentId(comment_id)
    .then(result => {
      if (result === 0) res.status(404).send({ msg: "Comment does not exist" });
      else res.sendStatus(204);
    })
    .catch(next);
};

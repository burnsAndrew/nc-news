const { selectTopics, writeTopic } = require("../models/topics");

exports.sendTopics = (req, res, next) => {
  selectTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  writeTopic({ ...req.params, ...req.body })
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};

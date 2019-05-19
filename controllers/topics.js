const { selectTopics } = require("../models/topics");

exports.sendTopics = (req, res, next) => {
  selectTopics()
    .then(topics => {
      //if statement for err
      // ***
      //else
      res.status(200).send({ topics });
    })
    .catch(next);
};

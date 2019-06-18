const topicsRouter = require("express").Router();
const { sendTopics, postTopic } = require("../controllers/topics");
const { methodNotAllowed } = require("../errors/index");

topicsRouter
  .route("/")
  .get(sendTopics)
  .post(postTopic)
  .all(methodNotAllowed);

module.exports = topicsRouter;

const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topics");

topicsRouter.route("/").get(sendTopics);

module.exports = topicsRouter;

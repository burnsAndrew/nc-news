const commentsRouter = require("express").Router();
const {} = require("../controllers/comments");

commentsRouter.route("/").get();

module.exports = commentsRouter;

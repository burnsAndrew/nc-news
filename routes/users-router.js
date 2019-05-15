const usersRouter = require("express").Router();
const {} = require("../controllers/users");

usersRouter.route("/").get();

module.exports = usersRouter;

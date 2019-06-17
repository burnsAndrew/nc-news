const usersRouter = require("express").Router();
const { sendUsers, sendAllUsers } = require("../controllers/users");
const { methodNotAllowed } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(sendUsers)
  .all(methodNotAllowed);
usersRouter
  .route("/")
  .get(sendAllUsers)
  .all(methodNotAllowed);

module.exports = usersRouter;

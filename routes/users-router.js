const usersRouter = require("express").Router();
const { sendUsers, sendAllUsers, postUser } = require("../controllers/users");
const { methodNotAllowed } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(sendUsers)
  .all(methodNotAllowed);
usersRouter
  .route("/")
  .get(sendAllUsers)
  .post(postUser)
  .all(methodNotAllowed);

module.exports = usersRouter;

const usersRouter = require("express").Router();
const { sendUsers } = require("../controllers/users");
const { methodNotAllowed } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(sendUsers)
  .all(methodNotAllowed);

module.exports = usersRouter;

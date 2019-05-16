const usersRouter = require("express").Router();
const { sendUsers } = require("../controllers/users");

usersRouter.route("/:username").get(sendUsers);

module.exports = usersRouter;

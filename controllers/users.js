const { selectUsers, selectAllUsers } = require("../models/users");

exports.sendAllUsers = (req, res, next) => {
  selectAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.sendUsers = (req, res, next) => {
  const username = req.params;
  selectUsers(username)
    .then(([user]) => {
      if (!user) res.status(404).send({ msg: "Invalid Username" });
      else res.status(200).send({ user });
    })
    .catch(next);
};

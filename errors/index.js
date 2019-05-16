exports.routeNotFound = (err, req, res) => {
  if (err.status) {
    res.status(404).send({ msg: "Route Not Found" });
  } else next(err);
};

exports.methodNotAllowed = (err, req, res, next) => {
  if (err.status) {
    res.status(405).send({ msg: "Method Not Allowed" });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle400 = (err, req, res, next) => {
  const codes = {
    "22P02": "Invalid Format",
    "42703": "Invalid Request",
    "23503": "Page Not Found",
    "23502": "Bad Request"
  };
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Page Not Found" });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  if (err.status === 500) {
    res.status(500).send({ msg: "Internal Server Error" });
  } else next(err);
};

const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500, handle400, handle404 } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handle400);
app.use(handle404);
app.use(handle500);

module.exports = app;

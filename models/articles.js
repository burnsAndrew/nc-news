const connection = require("../db/connection");

exports.selectArticles = ({ sort_by }) => {
  return connection
    .select("*")
    .from("articles")
    .orderBy(sort_by || "created_at", "asc");
};

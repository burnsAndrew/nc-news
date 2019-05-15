process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

describe.only("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200 and an 'ok: true' response", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.eql(true);
        });
    });
  });
  describe("/api/topics", () => {
    it("GET status:200 and respond with an array of topic objects, each with slug and description properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.eql({
            topics: [
              {
                description: "The man, the Mitch, the legend",
                slug: "mitch"
              },
              {
                description: "Not dogs",
                slug: "cats"
              },
              {
                description: "what books are made of",
                slug: "paper"
              }
            ]
          });
        });
    });
  });

  describe("/api/articles", () => {
    it("GET status:200 and respond with an array of articles objects, with specific properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes"
          );
          expect(res.body.articles[0].author).to.be.a("string");
          expect(res.body.articles[0].author).to.equal("butter_bridge");
          expect(res.body.articles[0].title).to.equal(
            "Living in the shadow of a great man"
          );
        });
    });
    it("GET status:200 and respond with an array of articles objects, with the property 'comment_count'", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0]).to.contain.keys("comment_count");
        });
    });
    it("GET status:200 and respond with articles sorted by date as default", () => {
      return request(app)
        .get("/api/articles?sort_by=created_at&order=desc")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.descendingBy("created_at", {
            ascending: false
          });
        });
    });
    it("GET status:200 and respond with articles sorted by author in ascending order", () => {
      return request(app)
        .get("/api/articles?sort_by=author&order=asc")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.ascendingBy("author", {
            ascending: true
          });
        });
    });
    it("GET status:200 and respond with articles that can be set to ascending or descending order, defaulted to descending order", () => {
      return request(app)
        .get("/api/articles?sort_by=author&order=desc")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.descendingBy("author", {
            descending: true
          });
        });
    });
    it("GET status:200 and respond with articles filtered by author", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(res => {
          const allByAuthor = res.body.articles.every(article => {
            return article.author === "butter_bridge";
          });
          expect(allByAuthor).to.be.true;
        });
    });
    it("GET status:200 and respond with articles filtered by topic", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(res => {
          const allByTopic = res.body.articles.every(article => {
            return article.topic === "mitch";
          });
          expect(allByTopic).to.be.true;
        });
    });
  });
  xdescribe("/articles/:article_id", () => {
    it("x", () => {
      return request(app)
        .delete("/api/articles/:article_id")
        .expect(200);
    });
  });
});

//Example of a delete request test from the lecture (deleting house 1 in this case)
xdescribe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/houses", () => {
    it("DELETE /:house_id - status: 204 - deletes the specified house", () => {
      return request(app)
        .delete("/api/houses/1")
        .expect(204);
    });
  });
  // example of where a delete request is a bad request
  xdescribe("/houses", () => {
    it("DELETE /:house_id - status: 400 - responds with bad request!", () => {
      return request(app)
        .delete("/api/houses/invalid_id_format")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Bad request!");
        });
    });
  });
  //example of an attempt to delete a house that does not exist
  xdescribe("/houses", () => {
    it("DELETE /:house_id - status: 404 - responds with bad request, house does not exist!", () => {
      return request(app)
        .delete("/api/houses/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("House does not exist!");
        });
    });
  });
});

//example of error handling by Tom
xdescribe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  xdescribe("/not_a_route", () => {
    it("ANY status:404 - responds with a route not found error", () => {
      return request(app)
        .get("/not_a_route")
        .expect(404)
        .then(({ body }) => {
          console.log(body); // prints an empty object initially, but when the app.use is added to app.js, it'll work and then can remove the console log
          expect(body.msg).to.eql("Route not found!");
        });
    });
  });

  // 405 example
  xdescribe("/houses", () => {
    it("ALL status:405 - responds with a method not allowed error", () => {
      return request(app)
        .put("/api/houses/1")
        .expect(405)
        .then(({ body }) => {
          console.log(body); // prints an empty object initially, but when the app.use is added to app.js, it'll work and then can remove the console log
          expect(body.msg).to.equal("Method not allowed!");
        });
    });
  });
  // 400 patch example
  xdescribe("/houses", () => {
    it("/PATCH /:house_id - status 400 responds bad request when given a malformed body", () => {
      return request(app)
        .patch("/api/houses/1")
        .send({ house_points: null })
        .then(({ body }) => {
          expect(body.msg).to.equal("Bad request!");
        });
    });
  });
});

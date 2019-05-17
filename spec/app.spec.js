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

    describe("/not_a_route", () => {
      it("ERROR status:404 - responds with a 'Route Not Found' error", () => {
        return request(app)
          .get("/api/not_a_route")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.eql("Route Not Found");
          });
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

  describe("/articles/:article_id", () => {
    it("GET status:200 and respond with an article object with the appropriate properties", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(res => {
          expect(res.body.article).to.eql({
            author: "icellusedkars",
            title: "Eight pug gifs that remind me of mitch",
            article_id: 3,
            body: "some gifs",
            topic: "mitch",
            created_at: "2010-11-17T00:00:00.000Z",
            votes: 0,
            comment_count: "0"
          });
          expect(res.body.article).to.contain.key("author");
          expect(res.body.article).to.contain.key("article_id");
        });
    });

    xit("ERROR status:400 responds with 'Article Does Not Exist'", () => {
      return request(app)
        .get("/api/articles/99999")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Article Does Not Exist");
        });
    });

    xit("ERROR status:400 responds with 'Invalid Format'", () => {
      return request(app)
        .get("/api/articles/abc")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Invalid Format");
        });
    });

    it("PATCH status 200 and respond with an updated article ", () => {
      const newVote = 1;
      const voteIncrementer = { inc_votes: newVote };
      return request(app)
        .patch("/api/articles/1")
        .send(voteIncrementer)
        .expect(200)
        .then(res => {
          expect(res.body.article).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 101,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T00:00:00.000Z"
          });
        });
    });

    xit("ERROR status:400 responds bad request when given a malformed body", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ article_id: null })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Bad Request");
        });
    });
  });

  describe("/articles/:article_id/comments", () => {
    it("GET status:200 and respond with an array of comments", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(res => {
          expect(res.body.comments[0]).to.contain.keys(
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          );
        });
    });

    it("GET status:200 and respond with articles sorted by date as default", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=created_at&order=desc")
        .expect(200)
        .then(res => {
          expect(res.body.comments).to.be.descendingBy("created_at", {
            ascending: false
          });
        });
    });

    it("GET status:200 and respond with articles sorted by author in ascending order", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=author&order=asc")
        .expect(200)
        .then(res => {
          expect(res.body.comments).to.be.ascendingBy("author", {
            ascending: true
          });
        });
    });

    it("POST status:201 and responds with a successfully posted comment", () => {
      const newComment = {
        username: "butter_bridge",
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.Voluptatem accusantium eius error adipisci quibusdam doloribus."
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then(res => {
          expect(res.body.comment).to.have.keys(
            "article_id",
            "author",
            "body",
            "comment_id",
            "created_at",
            "votes"
          );
        });
    });
  });

  describe("/comments/:comment_id", () => {
    it("PATCH status:200 and responds with a successfully updated comment", () => {
      const newVote = 1;
      const voteIncrementer = { inc_votes: newVote };
      return request(app)
        .patch("/api/comments/1")
        .send(voteIncrementer)
        .expect(200)
        .then(res => {
          expect(res.body.comment).to.eql({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 17,
            created_at: "2017-11-22T00:00:00.000Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
          });
        });
    });

    it("DELETE status:204 and responds with no content, as it has been successfully deleted", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204);
    });

    xit("ERROR status:400 - responds with 'Invalid Format'", () => {
      return request(app)
        .delete("/api/comments/invalid_format")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Invalid Format");
        });
    });

    xit("ERROR status:404 - responds with 'Route Not Found'", () => {
      return request(app)
        .delete("/api/comments/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Route Not Found");
        });
    });
  });

  describe("/users/:username", () => {
    it("GET status:200 and responds with a user object", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body.user).to.eql({
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
          });
        });
    });
    xit("ERROR status:404 - responds with 'Route Not Found'", () => {
      return request(app)
        .delete("/api/users/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Route Not Found");
        });
    });
  });
});

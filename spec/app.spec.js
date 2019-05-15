process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe.only("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
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

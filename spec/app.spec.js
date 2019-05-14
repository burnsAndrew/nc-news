process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  // beforeEach(() => connection.seed.run());
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
});

const {
  dateConverter,
  createRef,
  renameKeys,
  formatData
} = require("../utils/data-handler");
const { expect } = require("chai");

describe("dateConverter", () => {
  it("given an empty array, return an empty array", () => {
    const input = [];
    const actual = dateConverter(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("given an array with a single key value pair object, return an array with updated key value pairs", () => {
    const input = [{ created_at: 1542284514171 }];
    const actual = dateConverter(input);
    const expected = [{ created_at: "Thu Nov 15 2018" }];
    expect(actual).to.eql(expected);
  });
  it("given an array with multiple key value pairs in an object, return an array with updated objects", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const actual = dateConverter(input);
    const expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "Thu Nov 15 2018",
        votes: 100
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("given an array with multiple key value pairs in an object, return an array with updated objects", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const actual = dateConverter(input);
    const expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "Thu Nov 15 2018",
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: "Wed Nov 17 2010"
      }
    ];
    expect(actual).to.eql(expected);
  });
});

describe.only("createRef", () => {
  it("given an empty array return empty object", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
});

xdescribe("renameKeys", () => {
  it("given an empty array return empty object", () => {
    const input = [];
    const actual = renameKeys(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
});

xdescribe("formatData", () => {
  it("given an empty array return empty object", () => {
    const input = [];
    const actual = formatData(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
});

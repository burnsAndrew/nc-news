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

describe("createRef", () => {
  it("given an empty array return empty object", () => {
    const input = [];
    const actual = createRef(input, "article_id", "title");
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("given an array with a single element, return an object with a new key value pair", () => {
    const input = [
      { article_id: 1, title: "Living in the shadow of a great man" }
    ];
    const actual = createRef(input, "article_id", "title");
    const expected = { 1: "Living in the shadow of a great man" };
    expect(actual).eql(expected);
  });
  it("given an array with multiple elements, return an object with new key value pairs", () => {
    const input = [
      { article_id: 1, title: "Living in the shadow of a great man" },
      { article_id: 2, title: "Sony Vaio; or, The Laptop" }
    ];
    const actual = createRef(input, "article_id", "title");
    const expected = {
      1: "Living in the shadow of a great man",
      2: "Sony Vaio; or, The Laptop"
    };
    expect(actual).eql(expected);
  });
});

describe("renameKeys", () => {
  it("given an empty array return empty array", () => {
    const input = [];
    const keyToChange = "";
    const newKey = "";
    const actual = renameKeys(input, keyToChange, newKey);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it("given an single element, return a new array with an updated key", () => {
    const input = [{ created_by: "butter_bridge" }];
    const keyToChange = "created_by";
    const newKey = "author";
    const actual = renameKeys(input, keyToChange, newKey);
    const expected = [{ author: "butter_bridge" }];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it("given multiple elements, return a new array with an updated keys", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14
      }
    ];
    const keyToChange = "created_by";
    const newKey = "author";
    const actual = renameKeys(input, keyToChange, newKey);
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        author: "butter_bridge",
        votes: 16
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        votes: 14
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
});

describe("formatData", () => {
  it("given an empty array return empty object", () => {
    const input = [];
    const lookup = {};
    const actual = formatData(input, lookup);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it("given a single element array, return the single element with updated information in an array", () => {
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      }
    ];
    const lookup = {
      "Living in the shadow of a great man": 1
    };
    const actual = formatData(input, lookup);
    const expected = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: 1,
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it("given an array, return the array with updated information in an array", () => {
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const lookup = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 2
    };
    const actual = formatData(input, lookup);
    const expected = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: 1,
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 2,
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
});

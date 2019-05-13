const { createRef, renameKeys } = require("../utils/data-handler");
const { expect } = require("chai");

describe("createRef", () => {
  it("given an empty array return empty object", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
});

describe("renameKeys", () => {
  it("given an empty array, return empty array", () => {
    const input = [];
    const actual = renameKeys(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("given an single element, return a new array with an updated key", () => {
    const input = [{ slug: "mitch" }];
    const keyToChange = "slug";
    const newKey = "topic";
    const actual = renameKeys(input, keyToChange, newKey);
    const expected = [{ topic: "mitch" }];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it("given multiple elements, return a new array with updated keys", () => {
    const input = [
      {
        title: "Student SUES Mitch!",
        slug: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171
      },
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        slug: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171
      }
    ];
    const keyToChange = "slug";
    const newKey = "topic";
    const actual = renameKeys(input, keyToChange, newKey);
    const expected = [
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171
      },
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
});

const {
  dateConverter,
  createRef,
  renameKeys
} = require("../utils/data-handler");
const { expect } = require("chai");

describe.only("dateConverter", () => {
  it("given an empty object, return an empty object", () => {
    const input = {};
    const actual = dateConverter(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("given a single key value pair, return an object with  object", () => {
    const input = {};
    const actual = dateConverter(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
});

describe("createRef", () => {
  it("given an empty array return empty object", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
});

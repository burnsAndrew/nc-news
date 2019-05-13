const { createRef } = require("../utils/data-handler");
const { expect } = require("chai");

describe.only("createRef", () => {
  it("given an empty array return empty object", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
});

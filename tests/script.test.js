const { test, expect } = require("@jest/globals");
const helper = require("../scripts/helper");

test("Generated a semi-unique id with letters and numbers", () => {
  expect(helper.uniqueFileId()).toMatch(/^[a-zA-Z0-9]*$/);
});

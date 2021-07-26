/* This demo contains a barebones test runner that emulates the basic
features of Jest. For full functionality, install `jest-joi` locally in
your project. See npmjs.com/package/jest-joi for setup instructions. */

// The folloing line is only for this demo — don't include it in your project.
const { test, expect } = require("jest-joi").demo("runkit");

// Hit "run" below to see some results!
// You can copy over examples from the documentation.

const Joi = require("joi");

test("A number will not match a string schema", () => {
  const schema = Joi.string();
  const input = 3;
  expect(input).toMatchSchema(schema);
});

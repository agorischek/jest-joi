/* This demo contains a barebones test runner that emulates the basic
features of Jest. For full functionality, install `jest-joi` locally in
your project. See npmjs.com/package/jest-joi for setup instructions. */

// The folloing line is only for this demo — don't include it in your project.
const { test, expect } = require("jest-joi").demo("runkit");

// Hit "run" below to see some results!
// You can also copy over examples from the documentation.

const Joi = require("joi");

// This one will pass! 🎉
test("A string should match its schema", () => {
  const schema = Joi.string();
  const input = "Hello!";
  expect(input).toMatchSchema(schema);
});

// But this one will fail 😔
test("An object should match its schema", () => {
  const schema = { a: Joi.string() };
  const input = { a: false };
  expect(input).toMatchSchema(schema);
});

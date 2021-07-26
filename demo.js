const { test, expect } = require("./dist").demo();
const Joi = require("joi");

test("A number will not match a string schema", () => {
  const schema = Joi.string();
  const input = 3;
  expect(input).toMatchSchema(schema);
});

test("A boolean property will not match a string property", () => {
  const schema = Joi.object({
    a: Joi.string(),
  });
  const input = {
    a: false,
  };
  expect(input).toMatchSchema(schema);
});

test("A string will not match a string schema when negated", () => {
  const schema = Joi.string();
  const input = "a";
  expect(input).not.toMatchSchema(schema);
});

test("A property will not match an empty object schema with options passed", () => {
  const schema = Joi.object({});
  const input = {
    b: true,
  };
  const options = {
    allowUnknown: false,
  };
  expect(input).toMatchSchema(schema, options);
});

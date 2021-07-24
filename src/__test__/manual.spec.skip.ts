// Use these tests to manually inspect error messages.
// These tests are expected to fail!

import * as Joi from "joi";

test("Error message when input doesn't match simple string schema", () => {
  const schema = Joi.string();
  const input = 3;
  expect(input).toMatchSchema(schema);
});

test("Error message when input doesn't match simple number schema", () => {
  const schema = Joi.number();
  const input = "a";
  expect(input).toMatchSchema(schema);
});

test("Error message when input doesn't match simple boolean schema", () => {
  const schema = Joi.boolean();
  const input = 1;
  expect(input).toMatchSchema(schema);
});

test("Error message when input doesn't match object schema with one property", () => {
  const schema = Joi.object({ a: Joi.string() });
  const input = { a: false };
  expect(input).toMatchSchema(schema);
});

test("Error message when input doesn't match object schema with multiple properties", () => {
  const schema = Joi.object({
    a: Joi.string(),
    b: Joi.number(),
    c: Joi.boolean(),
  });
  const input = { a: false, b: "x", c: 1 };
  expect(input).toMatchSchema(schema);
});

test("Error message when input matches string schema and is negated", () => {
  const schema = Joi.string();
  const input = "a";
  expect(input).not.toMatchSchema(schema);
});

test("Error message when a boolean is submitted for a schema", () => {
  const schema = false;
  const input = 1;
  expect(input).toMatchSchema(schema);
});

test("Error message when an object is submitted for a schema", () => {
  const schema = { a: 1, b: 2, c: { d: 3 } };
  const input = 1;
  expect(input).toMatchSchema(schema);
});

test("Error message when a function is submitted for a schema", () => {
  const schema = () => "x";
  const input = 1;
  expect(input).toMatchSchema(schema);
});

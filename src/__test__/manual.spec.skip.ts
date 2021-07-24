// Use these tests to manually inspect error messages.
// These tests are expected to fail!

import * as Joi from "joi";

test("String schema mismatch", () => {
  const schema = Joi.string();
  const input = 3;
  expect(input).toMatchSchema(schema);
});

test("Number schema mismatch", () => {
  const schema = Joi.number();
  const input = "a";
  expect(input).toMatchSchema(schema);
});

test("Boolean schema mismatch", () => {
  const schema = Joi.boolean();
  const input = 1;
  expect(input).toMatchSchema(schema);
});

test("Object schema mismatch", () => {
  const schema = Joi.object({ a: Joi.string() });
  const input = { a: false };
  expect(input).toMatchSchema(schema);
});

test("Object schema multiple mismatch", () => {
  const schema = Joi.object({
    a: Joi.string(),
    b: Joi.number(),
    c: Joi.boolean(),
  });
  const input = { a: false, b: "x", c: 1 };
  expect(input).toMatchSchema(schema);
});

test("String schema not mismatch", () => {
  const schema = Joi.string();
  const input = "a";
  expect(input).not.toMatchSchema(schema);
});

test("Object schema match with options", () => {
  const schema = Joi.object({});
  const input = { b: true };
  const options = { allowUnknown: false };
  expect(input).toMatchSchema(schema, options);
});

test("Bad schema to fail", () => {
  const schema = false;
  const input = { b: true };
  expect(input).toMatchSchema(schema);
});
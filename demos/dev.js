const { test, expect } = require("../dist").demo();

const Joi = require("joi");

test("A matching string will pass validation", () => {
  const schema = Joi.string();
  const value = "Hello!";
  expect(value).toMatchSchema(schema);
});

test("A negated matching string will fail validation", () => {
  const schema = Joi.string();
  const value = "Hello!";
  expect(value).not.toMatchSchema(schema);
});

test("An mismatched object will fail validation", () => {
  const schema = { a: Joi.string() };
  const value = { a: false };
  expect(value).toMatchSchema(schema);
});

test("An negated mismatched object will pass validation", () => {
  const schema = { a: Joi.string() };
  const value = { a: false };
  expect(value).not.toMatchSchema(schema);
});

test("A valid schema will pass validation", () => {
  const schema = Joi.string();
  expect(schema).toBeSchema();
});

test("A negated valid schema will fail validation", () => {
  const schema = Joi.string();
  expect(schema).not.toBeSchema();
});

test("An non-schema will fail validation", () => {
  const schema = "a";
  expect(schema).toBeSchema();
});

test("An negated non-schema will pass validation", () => {
  const schema = "a";
  expect(schema).not.toBeSchema();
});

test("A schema literal will pass validation", () => {
  const schema = true;
  expect(schema).toBeSchemaLike();
});

test("A negated schema literal will fail validation", () => {
  const schema = true;
  expect(schema).not.toBeSchemaLike();
});

test("An non-schema literal will fail validation", () => {
  const schema = BigInt("1");
  expect(schema).toBeSchemaLike();
});

test("An negated non-schema literal will pass validation", () => {
  const schema = BigInt("1");
  expect(schema).not.toBeSchemaLike();
});

import * as Joi from "joi";

test("Should pass with a valid schema literal", () => {
  expect("a").toBeSchemaLike();
});

test("Should throw with an invalid schema literal", () => {
  expect(() => {
    expect(BigInt("1")).toBeSchemaLike();
  }).toThrow();
});

test("Should pass with a negated invalid schema", () => {
  expect(BigInt("1")).not.toBeSchemaLike();
});

test("Should throw with a negated valid schema literal", () => {
  expect(() => {
    expect(true).not.toBeSchemaLike();
  }).toThrow();
});

test("Should pass with a valid schema", () => {
  expect(Joi.string()).toBeSchemaLike();
});

test("Should throw with an invalid schema", () => {
  expect(() => {
    expect(BigInt("1")).toBeSchemaLike();
  }).toThrow();
});

test("Should pass with a negated invalid schema", () => {
  expect(BigInt("1")).not.toBeSchemaLike();
});

test("Should throw with a negated valid schema", () => {
  expect(() => {
    expect(Joi.string()).not.toBeSchemaLike();
  }).toThrow();
});

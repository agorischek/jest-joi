import * as Joi from "joi";

test("Should pass with a valid schema", () => {
  expect(Joi.string()).toBeSchema();
});

test("Should throw with an invalid schema", () => {
  expect(() => {
    expect(BigInt("1")).toBeSchema();
  }).toThrow();
});

test("Should pass with a negated invalid schema", () => {
  expect(BigInt("1")).not.toBeSchema();
});

test("Should throw with a negated valid schema", () => {
  expect(() => {
    expect(Joi.string()).not.toBeSchema();
  }).toThrow();
});

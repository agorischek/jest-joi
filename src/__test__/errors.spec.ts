import * as Joi from "joi";

// When set to false, the tests in this file serve as end-to-end tests, ensuring `toMatchSchema` throws.
// When set to true, the tests in this file fail and allow error messages to be inspected manually.
// Be sure to set to `false` before merging to mainline.
const manualErrorInspection = false;

test("Error message when input doesn't match simple string schema", () => {
  const schema = Joi.string();
  const input = 3;

  wrap(input, schema);
});

test("Error message when input doesn't match simple number schema", () => {
  const schema = Joi.number();
  const input = "a";

  wrap(input, schema);
});

test("Error message when input doesn't match simple boolean schema", () => {
  const schema = Joi.boolean();
  const input = 1;

  wrap(input, schema);
});

test("Error message when input doesn't match object schema with one property", () => {
  const schema = Joi.object({ a: Joi.string() });
  const input = { a: false };

  wrap(input, schema);
});

test("Error message when input doesn't match object schema with multiple properties", () => {
  const schema = Joi.object({
    a: Joi.string(),
    b: Joi.number(),
    c: Joi.boolean(),
  });
  const input = { a: false, b: "x", c: 1 };

  wrap(input, schema);
});

test("Error message when input matches string schema and is negated", () => {
  const schema = Joi.string();
  const input = "a";

  wrap(input, schema, true);
});

test("Error message when a boolean is submitted for a schema", () => {
  const schema = false;
  const input = 1;

  wrap(input, schema);
});

test("Error message when an object is submitted for a schema", () => {
  const schema = { a: 1, b: 2, c: { d: 3 } };
  const input = 1;

  wrap(input, schema);
});

test("Error message when a function is submitted for a schema", () => {
  const schema = () => "x";
  const input = 1;

  wrap(input, schema);
});

function wrap(input: unknown, schema: unknown, not?: boolean) {
  const wrappedAssertion = not
    ? () => expect(input).not.toMatchSchema(schema)
    : () => expect(input).toMatchSchema(schema);
  return manualErrorInspection
    ? wrappedAssertion()
    : expect(wrappedAssertion).toThrow();
}

import * as Joi from 'joi';

const schema = Joi.object({ a: Joi.string().required(), b: Joi.string().required() });

const goodInput = { a: 'hi', b: 'hi' };
const badInput = { a: false, b: false };
const extendedInput = { a: 'a', b: 'b', c: true };

const options = {
  allowUnknown: true,
}

test('Matcher should reject an invalid schema', () => {
  expect(() => {
    expect(goodInput).toMatchSchema("Not a schema");
  }).toThrow();
});

test('Matcher should pass when the received value matches the schema', () => {
  expect(goodInput).toMatchSchema(schema);
});

test('Bad input with `.not`', () => {
  expect(badInput).not.toMatchSchema(schema);
});

test("Should throw when input doesn't match schema", () => {
  expect(() => {
    expect(badInput).toMatchSchema(schema);
  }).toThrow();
});

test("Should throw when good input doesn't not match schema", () => {
  expect(() => {
    expect(goodInput).not.toMatchSchema(schema);
  }).toThrow();
});

test("Should throw when good input doesn't not match schema", () => {
  expect(() => {
    expect(extendedInput).toMatchSchema(schema);
  }).toThrow();
});

test("Should throw when good input doesn't not match schema", () => {
  expect(extendedInput).toMatchSchema(schema, options);
});

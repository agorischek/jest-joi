import * as Joi from "joi";
const { boolean, number, object, string } = Joi.types();

test("Should throw when submitted schema isn't valid", () => {
  const schema = "Not a schema";
  const input = "a";

  expect(() => {
    expect(input).toMatchSchema(schema);
  }).toThrow();
});

test("Should pass when the received value matches the schema", () => {
  const schema = object.keys({
    a: string.required(),
  });
  const input = {
    a: "x",
  };

  expect(input).toMatchSchema(schema);
});

test("Should pass with an invalid input and negation", () => {
  const schema = number;
  const input = false;

  expect(input).not.toMatchSchema(schema);
});

test("Should throw when input doesn't match simple schema", () => {
  const schema = string;
  const input = 2;

  expect(() => {
    expect(input).toMatchSchema(schema);
  }).toThrow();
});

test("Should throw when input doesn't match complex schema", () => {
  const schema = object.keys({
    a: number,
    b: boolean,
  });
  const input = {
    a: 1,
    b: "y",
  };

  expect(() => {
    expect(input).toMatchSchema(schema);
  }).toThrow();
});

test("Should throw when with valid input and negation", () => {
  const schema = boolean;
  const input = true;

  expect(() => {
    expect(input).not.toMatchSchema(schema);
  }).toThrow();
});

test("Should accept options to modify validation behavior", () => {
  const schema = object.keys({
    a: string,
  });
  const input = {
    a: "x",
    b: "y",
  };

  expect(() => {
    expect(input).toMatchSchema(schema);
  }).toThrow();

  const options = {
    allowUnknown: true,
  };

  expect(input).toMatchSchema(schema, options);
});

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

test("Should pass with an uncompiled schema and valid input", () => {
  const schema = 1;
  const input = 1;
  expect(input).toMatchSchema(schema);
});

test("Should pass when the received value matches a simple uncompiled schema", () => {
  const schema = 1;
  const input = 1;
  expect(input).toMatchSchema(schema);
});

test("Should pass when the received value doesn't match a simple uncompiled schema as is negated", () => {
  const schema = 1;
  const input = 2;
  expect(input).not.toMatchSchema(schema);
});

test("Should pass when the received value matches a complex uncompiled schema", () => {
  const schema = {
    a: true,
    b: ["x", "y", "z"],
    c: {
      d: [1, 2],
    },
  };
  const input = { a: true, b: "x" };
  expect(input).toMatchSchema(schema);
});

test("Should throw when the received value doesn't match a complex uncompiled schema", () => {
  const schema = {
    a: true,
    b: ["x", "y", "z"],
    c: {
      d: [1, 2],
    },
  };
  const input = { e: false };
  expect(() => expect(input).toMatchSchema(schema)).toThrow();
});

test("Should pass when the received value matches a partially uncompiled schema", () => {
  const schema = {
    a: Joi.string().required(),
  };
  const input = { a: "b" };
  expect(input).toMatchSchema(schema);
});

test("Should pass when the received value doesn't match a partially uncompiled schema and is negated", () => {
  const schema = {
    a: string.required(),
    b: number.required(),
  };
  const input = { a: "b" };
  expect(input).not.toMatchSchema(schema);
});

test("Should throw when the schema contains an unsupported data type", () => {
  const schema = BigInt("999999999999999999");
  const input = 2;
  expect(() => expect(input).toMatchSchema(schema)).toThrow();
});

test("Should throw when the schema contains a nested unsupported data type", () => {
  const schema = {
    big: BigInt("999999999999999999"),
  };
  const input = { big: 2 };
  expect(() => expect(input).toMatchSchema(schema)).toThrow();
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

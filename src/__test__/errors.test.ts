import * as Joi from "joi";
import { wrapBeSchema, wrapBeSchemaLike, wrapMatchSchema } from "./utils";

// When set to false, the tests in this file serve as end-to-end tests, ensuring `toMatchSchema` throws.
// When set to true, the tests in this file fail and allow error messages to be inspected manually.
// Be sure to set to `false` before merging to mainline.
export const manualErrorInspection = false;

describe("toMatchSchema()", () => {
  test("Error message when input doesn't match simple string schema", () => {
    const schema = Joi.string();
    const input = 3;

    wrapMatchSchema(input, schema);
  });

  test("Error message when input doesn't match simple number schema", () => {
    const schema = Joi.number();
    const input = "a";

    wrapMatchSchema(input, schema);
  });

  test("Error message when input doesn't match simple boolean schema", () => {
    const schema = Joi.boolean();
    const input = 1;

    wrapMatchSchema(input, schema);
  });

  test("Error message when input doesn't match object schema with one property", () => {
    const schema = Joi.object({
      a: Joi.string(),
    });
    const input = {
      a: false,
    };

    wrapMatchSchema(input, schema);
  });

  test("Error message when input doesn't match object schema with multiple properties", () => {
    const schema = Joi.object({
      a: Joi.string(),
      b: Joi.number(),
      c: Joi.boolean(),
    });
    const input = {
      a: false,
      b: "x",
      c: 1,
    };

    wrapMatchSchema(input, schema);
  });

  test("Error message when input matches string schema and is negated", () => {
    const schema = Joi.string();
    const input = "a";

    wrapMatchSchema(input, schema, true);
  });

  test("Error message when input matches object schema and is negated", () => {
    const schema = Joi.object({
      a: Joi.string(),
      b: Joi.number(),
      c: Joi.boolean(),
    });
    const input = {
      a: "x",
      b: 2,
      c: false,
    };

    wrapMatchSchema(input, schema, true);
  });

  test("Error message when a undefined is submitted for a schema", () => {
    const schema: string = undefined;
    const input = 1;

    wrapMatchSchema(input, schema);
  });

  test("Should throw when the schema contains an unsupported data type", () => {
    const schema = BigInt("999999999999999999");
    const input = 2;
    wrapMatchSchema(input, schema);
  });

  test("Should throw when the schema contains a multiply nested unsupported data type", () => {
    const schema = {
      nest: {
        moreNest: {
          sym: Symbol("something"),
        },
      },
    };
    const input = { big: 2 };
    wrapMatchSchema(input, schema);
  });
});

describe("toBeSchema()", () => {
  test("Should throw when a valid schema isn't expected", () => {
    const schema = Joi.string();
    wrapBeSchema(schema, true);
  });

  test("Should throw when a schema isn't valid", () => {
    const schema = 5;
    wrapBeSchema(schema);
  });
});

describe("toBeSchemaLike()", () => {
  test("Should throw when a simple schema literal isn't valid", () => {
    const schema = BigInt("1");
    wrapBeSchemaLike(schema);
  });

  test("Should throw when a complex schema literal isn't valid", () => {
    const schema = { big: BigInt("1") };
    wrapBeSchemaLike(schema);
  });

  test("Should throw when a valid schema literal isn't expected", () => {
    const schema = "a";
    wrapBeSchemaLike(schema, true);
  });

  test("Should throw when a valid schema isn't expected", () => {
    const schema = Joi.string();
    wrapBeSchemaLike(schema, true);
  });
});

import * as Joi from "joi";

import { getMessage, trim } from "./utils";

describe("toMatchSchema()", () => {
  test("Output for simple test", () => {
    const value = 2;
    const schema = Joi.string();
    const assertion = () => expect(value).toMatchSchema(schema);
    const message = getMessage(assertion);
    expect(message).toBe(
      trim(`
        expect(received).toMatchSchema(schema)

        Received: 2
        Expected: Received must be a string
     `)
    );
  });

  test("Output for simple negated test", () => {
    const value = "a";
    const schema = Joi.string();
    const assertion = () => expect(value).not.toMatchSchema(schema);
    const message = getMessage(assertion);
    expect(message).toBe(
      trim(`
        expect(received).not.toMatchSchema(schema)

        Received: "a"
        Schema: { "type": "string" }
      `)
    );
  });

  test("Output for a complex test", () => {
    const value = { a: true };
    const schema = { a: Joi.number() };
    const assertion = () => expect(value).toMatchSchema(schema);
    const message = getMessage(assertion);
    expect(message).toBe(
      trim(`
        expect(received).toMatchSchema(schema)

        Received:
        {
          "a" [1]: true
        }

        [1] "a" must be a number
      `)
    );
  });

  test("Output for a complex negated test", () => {
    const value = { a: { b: { c: 2 } } };
    const schema = { a: { b: { c: Joi.number() } } };
    const assertion = () => expect(value).not.toMatchSchema(schema);
    const message = getMessage(assertion);
    expect(message).toBe(
      trim(`
        expect(received).not.toMatchSchema(schema)

        Received:
        {
          "a": { "b": { "c": 2 } }
        }
        Schema:
        {
          "type": "object",
          "keys": {
            "a": {
              "type": "object",
              "keys": {
                "b": {
                  "type": "object",
                  "keys": { "c": { "type": "number" } }
                }
              }
            }
          }
        }
      `)
    );
  });

  test("Output for an invalid schema", () => {
    const value = BigInt("1");
    const schema = true;
    const assertion = () => expect(value).toMatchSchema(schema);
    const message = getMessage(assertion);
    expect(message).toBe(
      trim(`
        expect(received).toMatchSchema(schema)

        Received: 1
        Expected: Received must be [true]
      `)
    );
  });
});

describe("toBeSchema()", () => {
  test("Output for an invalid schema", () => {
    const schema = BigInt("1");
    const assertion = () => expect(schema).toBeSchema();
    const message = getMessage(assertion);
    expect(message).toBe(
      trim(`
        expect(received).toBeSchema()

        Error: Invalid schema content: bigint
        Received: (Unserializable)
        `)
    );
  });
});

test("Output for a negated valid schema", () => {
  const schema = Joi.string();
  const assertion = () => expect(schema).not.toBeSchema();
  const message = getMessage(assertion);
  expect(message).toBe(
    trim(`
      expect(received).not.toBeSchema()

      Schema:
      { "type": "string" }
    `)
  );
});

describe("toBeSchemaLike()", () => {
  test("Output for an invalid schema literal", () => {
    const schema = BigInt("1");
    const assertion = () => expect(schema).toBeSchemaLike();
    const message = getMessage(assertion);
    expect(message).toBe(
      trim(`
        expect(received).toBeSchemaLike() // Schema-like means accepted by Joi.compile()

        Error: Invalid schema content: bigint
        Received: (Unserializable)
      `)
    );
  });

  test("Output for an invalid schema literal object", () => {
    const schema = { big: BigInt("1") };
    const assertion = () => expect(schema).toBeSchemaLike();
    const message = getMessage(assertion);
    expect(message).toBe(
      trim(`
        expect(received).toBeSchemaLike() // Schema-like means accepted by Joi.compile()

        Error: Invalid schema content: bigint (big)
        Received: (Unserializable)
      `)
    );
  });

  test("Output for a negated schema literal", () => {
    const schema = true;
    const assertion = () => expect(schema).not.toBeSchemaLike();
    const message = getMessage(assertion);
    expect(message).toBe(
      trim(`
        expect(received).not.toBeSchemaLike() // Schema-like means accepted by Joi.compile()

        Schema:
        {
          "type": "any",
          "flags": { "only": true },
          "allow": [{ "override": true }, true]
        }
      `)
    );
  });
});

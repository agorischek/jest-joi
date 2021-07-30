import * as Joi from "joi";

import { getMessage } from "./utils";

test("Output for simple test", () => {
  const assertion = () => expect(2).toMatchSchema(Joi.string());
  const message = getMessage(assertion);
  expect(message).toBe(`
expect(received).toMatchSchema(schema)

Received: 2
Expected: Received must be a string
`);
});

test("Output for simple negated test", () => {
  const assertion = () => expect("a").not.toMatchSchema(Joi.string());
  const message = getMessage(assertion);
  expect(message).toBe(`
expect(received).not.toMatchSchema(schema)

Received: "a"

Schema:
{
  type: "string"
}
`);
});

test("Output for a complex test", () => {
  const assertion = () =>
    expect({ a: true }).toMatchSchema({ a: Joi.number() });
  const message = getMessage(assertion);
  expect(message).toBe(`
expect(received).toMatchSchema(schema)

Received:
{
  "a" [1]: true
}

[1] "a" must be a number
`);
});

test("Output for an invalid schema", () => {
  const assertion = () => expect(BigInt("1")).toMatchSchema(true);
  const message = getMessage(assertion);
  expect(message).toBe(`
expect(received).toMatchSchema(schema)

Received: 1
Expected: Received must be [true]
`);
});

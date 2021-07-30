import stripAnsi = require("strip-ansi");

import { manualErrorInspection } from "./errors.test";

export function wrapMatchSchema(
  input: unknown,
  schema: unknown,
  not?: boolean
): void {
  const wrappedAssertion = not
    ? () => expect(input).not.toMatchSchema(schema)
    : () => expect(input).toMatchSchema(schema);
  return manualErrorInspection
    ? wrappedAssertion()
    : expect(wrappedAssertion).toThrow();
}

export function wrapBeSchema(schema: unknown, not?: boolean): void {
  const wrappedAssertion = not
    ? () => expect(schema).not.toBeSchema()
    : () => expect(schema).toBeSchema();
  return manualErrorInspection
    ? wrappedAssertion()
    : expect(wrappedAssertion).toThrow();
}

export function wrapBeSchemaLike(schema: unknown, not?: boolean): void {
  const wrappedAssertion = not
    ? () => expect(schema).not.toBeSchemaLike()
    : () => expect(schema).toBeSchemaLike();
  return manualErrorInspection
    ? wrappedAssertion()
    : expect(wrappedAssertion).toThrow();
}

export function getMessage(assertion: () => unknown): string {
  try {
    assertion();
  } catch (error) {
    return "\n" + stripAnsi(error.matcherResult.message) + "\n";
  }
}

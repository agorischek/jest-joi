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
    return stripAnsi(error.matcherResult.message);
  }
}

export function trim(content: string): string {
  const split = content.split("\n");
  const spliced = split.splice(1, split.length - 2);
  const firstLineMatch = spliced[0].match(/^(\s*).+$/);
  const whitespace = firstLineMatch ? firstLineMatch[1] : null;
  if (whitespace) {
    const pattern = new RegExp("^" + whitespace + "(.*)$");
    const unpadded: string[] = [];
    spliced.forEach((item) => {
      if (item === "") {
        unpadded.push(item);
      } else {
        const lineMatch = item.match(pattern);
        if (lineMatch) {
          unpadded.push(lineMatch[1]);
        }
      }
    });
    const joined = unpadded.join("\n");
    return joined;
  } else {
    const joined = spliced.join("\n");
    return joined;
  }
}

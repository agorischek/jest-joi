import * as Joi from "joi";
import * as chalk from "chalk";
import { matcherHint } from "jest-matcher-utils";
import stringifyObject = require("stringify-object");

import { Result, Schema } from "./";

const receivedColor = chalk.red;
const expectedColor = chalk.green;

const print =
  (message: string): (() => string) =>
  (): string =>
    message;

const printObject = (object: unknown): string =>
  stringifyObject(object, {
    indent: "  ",
    singleQuotes: false,
  });

const expectedSchema = (schema: Joi.Schema): string =>
  expectedColor(printObject(schema.describe()));

const validReceived = (input: unknown): string =>
  receivedColor(printObject(input));

const invalidReceived = (input: unknown): string => receivedColor(input);

const invalidSchema = (input: unknown): string => {
  return isSimple(input)
    ? receivedColor(input)
    : receivedColor(printObject(input));
};
const validSchemaExplanation = (input: string): string => expectedColor(input);

const invalidSchemaExplanation = (input: string): string => {
  return receivedColor(input);
};

const errorExplanation = (error: Joi.ValidationError): string => {
  const annotation = error.annotate();
  const parsed = annotation.match(/^".+?" (.+)$/);
  if (parsed && parsed[1]) return `Received ${parsed[1]}`;
  else return annotation;
};

const simpleErrorExplanation = (error: Joi.ValidationError): string => {
  return expectedColor(errorExplanation(error));
};

const complexErrorExplanation = (error: Joi.ValidationError): string => {
  return errorExplanation(error);
};

const buildMatcherHint = (
  matcherName: string,
  matcherHintOptions: jest.MatcherHintOptions
) => {
  return matcherHint(matcherName, "received", "schema", matcherHintOptions);
};

const isSimple = (input: unknown) =>
  !(typeof input === "object" && input !== null);

const stack = (lines: Array<string>): string => {
  const reducer = (accumulator: string, value: string) => {
    return value === ""
      ? accumulator + "\n"
      : value === null
      ? accumulator
      : accumulator + "\n" + value;
  };
  return lines.reduce(reducer);
};

export class Message {
  fn: () => string;
  text: string;

  constructor(
    context: jest.MatcherContext,
    name: string,
    result: Result,
    received: unknown,
    schema: Schema
  ) {
    const hint = buildMatcherHint(name, context);
    const receivedIsSimple = isSimple(received);
    const originalSchemaIsSimple = isSimple(schema.submitted);

    const messageLines = !schema.isValid
      ? //If the schema isn't valid:
        [
          hint,
          "",
          "Expected: " +
            validSchemaExplanation("Schema must be a valid Joi schema"),
          "Receieved: " + invalidSchemaExplanation(schema.error),
          originalSchemaIsSimple
            ? "Schema: " + invalidSchema(schema.submitted)
            : "Schema:",
          originalSchemaIsSimple ? null : invalidSchema(schema.submitted),
        ]
      : result.pass // If the input matched the schema but was negated:
      ? [
          hint,
          "",
          receivedIsSimple
            ? "Received: " + validReceived(received)
            : "Received:",
          receivedIsSimple ? null : validReceived(received),
          "",
          "Schema:",
          expectedSchema(schema.compiled),
        ]
      : receivedIsSimple // If the input didn't match, and the schema is simple:
      ? [
          hint,
          "",
          "Received: " + invalidReceived(received),
          "Expected: " + simpleErrorExplanation(result.error),
        ]
      : // If the input didn't match, and the schema is complex:
        [hint, "", "Received:", complexErrorExplanation(result.error)];

    this.text = stack(messageLines);
    this.fn = print(this.text);
  }
}

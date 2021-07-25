import * as Joi from "joi";
import * as chalk from "chalk";
import { MatcherHintOptions, matcherHint } from "jest-matcher-utils";

import stringifyObject = require("stringify-object");

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

export const buildMessage = (
  schemaIsValid: boolean,
  pass: boolean,
  matcherName: string,
  received: unknown,
  schema: Joi.Schema,
  error: Joi.ValidationError,
  matcherHintOptions: MatcherHintOptions
): (() => string) => {
  const hint = buildMatcherHint(matcherName, matcherHintOptions);
  const receivedIsSimple = isSimple(received);
  const schemaIsSimple = isSimple(schema);

  const messageLines = !schemaIsValid
    ? //If the schema isn't valid:
      [
        hint,
        "",
        "Expected: " +
          validSchemaExplanation("Schema must be a valid Joi schema"),
        schemaIsSimple ? "Schema: " + invalidSchema(schema) : "Schema:",
        schemaIsSimple ? null : invalidSchema(schema),
      ]
    : pass // If the input matched the schema but was negated:
    ? [
        hint,
        "",
        receivedIsSimple ? "Received: " + validReceived(received) : "Received:",
        receivedIsSimple ? null : validReceived(received),
        "",
        "Schema:",
        expectedSchema(schema),
      ]
    : receivedIsSimple // If the input didn't match, and the schema is simple:
    ? [
        hint,
        "",
        "Received: " + invalidReceived(received),
        "Expected: " + simpleErrorExplanation(error),
      ]
    : // If the input didn't match, and the schema is complex:
      [hint, "", "Received: ", complexErrorExplanation(error)];

  return print(stack(messageLines));
};

import * as Joi from "joi";
import * as chalk from "chalk";
import { MatcherHintOptions, matcherHint } from "jest-matcher-utils";

import stringifyObject = require("stringify-object");

const receivedColor = chalk.red;
const expectedColor = chalk.green;

export const print =
  (message: string): (() => string) =>
  (): string =>
    message;

export const printObject = (object: unknown): string =>
  stringifyObject(object, {
    indent: "  ",
    singleQuotes: false,
  });

const expectedSchema = (schema: Joi.Schema): string =>
  expectedColor(printObject(schema.describe()));

const validReceived = (input: unknown): string =>
  receivedColor(printObject(input));

const invalidReceived = (input: unknown): string => receivedColor(input);

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
    return value === null ? accumulator + "\n" : accumulator + "\n" + value;
  };
  return lines.reduce(reducer);
};

export const buildMessage = (
  pass: boolean,
  matcherName: string,
  received: unknown,
  schema: Joi.Schema,
  error: Joi.ValidationError,
  matcherHintOptions: MatcherHintOptions
): (() => string) => {
  const hint = buildMatcherHint(matcherName, matcherHintOptions);
  const receivedIsSimple = isSimple(received);

  const messageLines = pass
    ? [
        hint,
        null,
        "Received:",
        validReceived(received),
        null,
        "Schema:",
        expectedSchema(schema),
      ]
    : receivedIsSimple
    ? [
        hint,
        null,
        "Received: " + invalidReceived(received),
        "Expected: " + simpleErrorExplanation(error),
      ]
    : [hint, null, "Received: ", complexErrorExplanation(error)];

  return print(stack(messageLines));
};

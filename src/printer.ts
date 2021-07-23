import * as Joi from "joi";
import * as chalk from "chalk";
import {
  MatcherHintOptions,
  matcherHint,
} from "jest-matcher-utils";

import stringifyObject = require("stringify-object");

type JestMessage = () => string;

export const print =
  (message: string): (() => string) =>
  (): string =>
    message;

export const printObject = (object: unknown): string =>
  stringifyObject(object, {
    indent: "  ",
    singleQuotes: false,
  });

const receivedColor = chalk.red;
const expectedColor = chalk.green;

const expectedSchema = (schema: Joi.Schema): string =>
  expectedColor(printObject(schema.describe()));

const validReceivedInput = (input: unknown): string =>
  receivedColor(printObject(input));

const invalidReceivedInput = (error: Joi.ValidationError): string => {
  const annotation = error.annotate();
  const parsed = annotation.match(/^".+?" (.+)$/);
  if (parsed && parsed[1]) return parsed[1];
  else return annotation;
};

export const buildMessage = (
  pass: boolean,
  matcherName: string,
  received: unknown,
  schema: Joi.Schema,
  error: Joi.ValidationError,
  matcherHintOptions: MatcherHintOptions
): JestMessage => {
  const hint = matcherHint(
    matcherName,
    "received",
    "schema",
    matcherHintOptions
  );
  const receivedIsSimple = !(typeof received === "object" && received !== null);

  const br = "\n";
  const brbr = "\n\n";

  const message = pass
    ? print(
        `${hint}` +
          brbr +
          `Schema:` +
          br +
          `${expectedSchema(schema)}` +
          brbr +
          `Received:\n${validReceivedInput(received)}`
      )
    : receivedIsSimple
    ? print(
        `${hint}` +
          brbr +
          `Received: ${receivedColor(received)}` +
          br +
          `Expected: ${expectedColor(
            "Received " + invalidReceivedInput(error)
          )}`
      )
    : print(
        `${hint}` + brbr + `Received:` + br + `${invalidReceivedInput(error)}`
      );

  return message;
};

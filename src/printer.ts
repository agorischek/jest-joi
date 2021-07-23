import * as Joi from "joi";
import * as chalk from "chalk";
import { MatcherHintOptions, matcherHint } from "jest-matcher-utils";

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
const invalidReceivedInput = (error: Joi.ValidationError): string =>
  error.annotate();

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
  const brbr = "\n";

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
    ? print(`${hint}\n\n` + `Received:\n${received}`)
    : print(`${hint}` + `\n\nReceived:${invalidReceivedInput(error)}\n}`);

  return message;
};

import * as Joi from "joi";
import * as chalk from "chalk";
import stringifyObject = require("stringify-object");

import { Hint, Received, Result, Schema } from "./";
import { isSimple, stack } from "../utils";

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

const messages = {
  invalidSchema: (hint: Hint, schema: Schema) => {
    return [
      hint.text,
      "",
      "Expected: " +
        validSchemaExplanation("Schema must be a valid Joi schema"),
      "Receieved: " + invalidSchemaExplanation(schema.error),
      schema.submittedIsSimple
        ? "Schema: " + invalidSchema(schema.submitted)
        : "Schema:",
      schema.submittedIsSimple ? null : invalidSchema(schema.submitted),
    ];
  },
  negatedMatch: (hint: Hint, schema: Schema, received: Received) => {
    return [
      hint.text,
      "",
      received.isSimple
        ? "Received: " + validReceived(received.input)
        : "Received:",
      received.isSimple ? null : validReceived(received.input),
      "",
      "Schema:",
      expectedSchema(schema.compiled),
    ];
  },
  simpleMismatch: (hint: Hint, received: Received, result: Result) => {
    return [
      hint.text,
      "",
      "Received: " + invalidReceived(received.input),
      "Expected: " + simpleErrorExplanation(result.error),
    ];
  },
  complexMisMatch: (hint: Hint, result: Result) => {
    return [hint.text, "", "Received:", complexErrorExplanation(result.error)];
  },
};

export class Message {
  fn: () => string;
  text: string;

  constructor(
    context: jest.MatcherContext,
    name: string,
    result: Result,
    received: Received,
    schema: Schema
  ) {
    const hint = new Hint(name, context);

    const messageLines: string[] = !schema.isValid
      ? messages.invalidSchema(hint, schema)
      : result.pass
      ? messages.negatedMatch(hint, schema, received)
      : received.isSimple
      ? messages.simpleMismatch(hint, received, result)
      : messages.complexMisMatch(hint, result);

    this.text = stack(messageLines);
    this.fn = print(this.text);
  }
}

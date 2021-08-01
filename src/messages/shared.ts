import * as Joi from "joi";
import * as chalk from "chalk";
const stringify = require("@aitodotai/json-stringify-pretty-compact");

import { isSimple } from "../utils";
import { Schema } from "../classes";

export const labels = {
  error: "Error:",
  expected: "Expected:",
  received: "Received:",
  schema: "Schema:",
};

export const receivedColor = chalk.red;
export const expectedColor = chalk.green;

export const print =
  (message: string): (() => string) =>
  (): string =>
    message;

export const stack = (lines: Array<string>): string => {
  const reducer = (accumulator: string, value: string) => {
    return value === ""
      ? accumulator + "\n"
      : value === null
      ? accumulator
      : accumulator + "\n" + value;
  };
  return lines.reduce(reducer);
};

export const printObject = (object: unknown): string =>
  stringify(object, { objectMargins: true, maxNesting: 2 });

export const expectedSchema = (schema: Joi.Schema): string =>
  expectedColor(printObject(schema.describe()));

export const validReceived = (input: unknown): string =>
  receivedColor(printObject(input));

export const invalidReceived = (input: unknown): string => receivedColor(input);

export const validSchema = (schema: Schema): string => {
  return receivedColor(printObject(schema.description));
};

export const invalidSchema = (input: unknown): string => {
  return isSimple(input)
    ? receivedColor(input)
    : receivedColor(printObject(input));
};
export const validSchemaExplanation = (input: string): string =>
  expectedColor(input);

export const invalidSchemaExplanation = (input: string): string => {
  return receivedColor(input);
};

export const errorExplanation = (error: Joi.ValidationError): string => {
  const annotation = error.annotate();
  const parsed = annotation.match(/^".+?" (.+)$/);
  if (parsed && parsed[1]) return `Received ${parsed[1]}`;
  else return annotation;
};

export const simpleErrorExplanation = (error: Joi.ValidationError): string => {
  return expectedColor(errorExplanation(error));
};

export const complexErrorExplanation = (error: Joi.ValidationError): string => {
  return errorExplanation(error);
};

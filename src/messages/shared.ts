import * as Joi from "joi";
import * as chalk from "chalk";
import stringifyObject = require("stringify-object");

import { isSimple } from "../utils";
import { Schema } from "../classes";

export const receivedColor = chalk.red;
export const expectedColor = chalk.green;

export const print =
  (message: string): (() => string) =>
  (): string =>
    message;

export const printObject = (object: unknown): string =>
  stringifyObject(object, {
    indent: "  ",
    singleQuotes: false,
  });

export const expectedSchema = (schema: Joi.Schema): string =>
  expectedColor(printObject(schema.describe()));

export const validReceived = (input: unknown): string =>
  receivedColor(printObject(input));

export const invalidReceived = (input: unknown): string => receivedColor(input);

export const validSchema = (schema: Schema): string => {
  return schema.input.isSimple
    ? receivedColor(schema.compiled.describe())
    : receivedColor(printObject(schema.compiled.describe()));
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

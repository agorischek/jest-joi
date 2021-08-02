import * as Joi from "joi";
import * as chalk from "chalk";

import { stringifyObject } from "../utils";

export * from "../utils";

export const labels = {
  error: "Error:",
  expected: "Expected:",
  received: "Received:",
  schema: "Schema:",
};

export const receivedColor = chalk.red;
export const expectedColor = chalk.green;

export const colors = {
  expected: expectedColor,
  received: receivedColor,
};

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

export const printObject = (object: unknown): string => {
  try {
    return stringifyObject(object, { objectMargins: true, maxNesting: 2 });
  } catch (error) {
    return "(Unserializable)";
  }
};

export const errorExplanation = (error: Joi.ValidationError): string => {
  const annotation = error.annotate();
  const parsed = annotation.match(/^".+?" (.+)$/);
  if (parsed && parsed[1]) return `Received ${parsed[1]}`;
  else return annotation;
};

import * as Joi from "joi";
import { MatcherHintOptions } from "jest-matcher-utils";

import { buildMessage, print } from "./printer";
import { processOptions } from "./options";

type MatcherResult = {
  message: () => string;
  pass: boolean;
};

export function toMatchSchema(
  this: jest.MatcherContext,
  received: unknown,
  schema: Joi.Schema,
  submittedOptions: Joi.ValidationOptions
): MatcherResult {
  const matcherName = "toMatchSchema";

  const options = processOptions(submittedOptions);

  const isSchema = Joi.isSchema(schema);
  if (!isSchema)
    return {
      message: print("Submitted schema was not a valid Joi schema"),
      pass: false,
    };

  const { error } = schema.validate(received, options);
  const pass = !error;

  const matcherHintOptions: MatcherHintOptions = {
    isNot: this.isNot,
    promise: this.promise,
  };
  const message = buildMessage(
    pass,
    matcherName,
    received,
    schema,
    error,
    matcherHintOptions
  );

  return { message, pass };
}
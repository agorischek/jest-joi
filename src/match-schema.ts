import * as Joi from "joi";
import { MatcherHintOptions } from "jest-matcher-utils";

import { buildMessage } from "./printer";
import { processOptions } from "./options";

export function toMatchSchema(
  this: jest.MatcherContext,
  received: unknown,
  schema: Joi.Schema,
  submittedOptions: Joi.ValidationOptions
): jest.CustomMatcherResult {
  const matcherName = "toMatchSchema";

  const options = processOptions(submittedOptions);

  const schemaIsValid = Joi.isSchema(schema);

  const error = schemaIsValid ? schema.validate(received, options).error : null;
  const pass = schemaIsValid && !error;

  const matcherHintOptions: MatcherHintOptions = {
    isNot: this.isNot,
    promise: this.promise,
  };
  const message = buildMessage(
    schemaIsValid,
    pass,
    matcherName,
    received,
    schema,
    error,
    matcherHintOptions
  );

  return {
    message,
    pass,
  };
}

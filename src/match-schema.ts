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

  const compiledSchema = schema === undefined ? undefined : Joi.compile(schema);
  const compiledSchemaIsValid = Joi.isSchema(compiledSchema);

  const error = compiledSchemaIsValid
    ? compiledSchema.validate(received, options).error
    : null;
  const pass = compiledSchemaIsValid && !error;

  const matcherHintOptions: MatcherHintOptions = {
    isNot: this.isNot,
    promise: this.promise,
  };
  const message = buildMessage(
    compiledSchemaIsValid,
    pass,
    matcherName,
    received,
    compiledSchema,
    error,
    matcherHintOptions
  );

  return {
    message,
    pass,
  };
}

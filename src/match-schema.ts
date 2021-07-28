import * as Joi from "joi";

import { Message, Options, Schema, Result } from "./classes";

export function toMatchSchema(
  this: jest.MatcherContext,
  received: unknown,
  submittedSchema: Joi.Schema,
  submittedOptions: Joi.ValidationOptions
): jest.CustomMatcherResult {
  const name = "toMatchSchema";
  const options = new Options(submittedOptions);
  const schema = new Schema(submittedSchema);
  const result = new Result(received, schema, options);
  const message = new Message(this, name, result, received, schema);

  return {
    message: message.fn,
    pass: result.pass,
  };
}
